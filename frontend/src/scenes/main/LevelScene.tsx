import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { NavigationScreenProps } from '../../types/navigation';
import { COLORS, FONT_SIZE } from '../../constants/styles';
import { Level, StageId } from '../../data/journey';
import { Phone, RewardList } from '../../components';
import { msToTime, msToCompletionTime } from '../../helpers/format';
import SVG from '../../../assets/svg';
import { showModal, closeModal } from '../../core-ui/ModalProvider';
import { calculateScore, rollRewards } from '../../helpers/level';
import { Reward } from '../../data/rewards';
import { UserJourney } from '../../fixtures/journey';
import { Button } from '../../core-ui';
import homebrewFetch from '../../helpers/homebrewFetch';
import { FIREBASE_URL, ENDPOINT } from '../../constants/network';
import { decodeToken, encodeToken } from '../../helpers/token';
import { getFromStorage } from '../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../constants/keys';
import { Response } from '../../types/firestore';
import { PhoneSkinId } from '../../data/phoneSkins';

type Props = {} & NavigationScreenProps;

const UPDATE_JOURNEY_PROGRESS_URL = `${FIREBASE_URL}${ENDPOINT.UPDATE_JOURNEY_PROGRESS}`;

export default function LevelScene(props: Props) {
  let { currentLevelData, currentLevelUserData, stageId, userPhoneSkin } = props
    .route.params as {
    currentLevelData: Level;
    currentLevelUserData: UserJourney;
    stageId: StageId;
    userPhoneSkin: PhoneSkinId;
  };

  let {
    codeContent,
    content,
    levelNo,
    stageName,
    expectedOutput,
    correctAnswers,
    difficulty,
    timeLimit,
    chanceRewards,
    firstTimeRewards,
  } = currentLevelData;
  let { isFirstTime } = currentLevelUserData[stageId][levelNo - 1];

  const [answer, setAnswer] = useState('');
  const [currentTime, setCurrentTime] = useState(timeLimit);
  const [stopTimer, setStopTimer] = useState(false);
  const [isEditable, setEditable] = useState(true);

  let onHomeButtonPress = useCallback(() => {
    closeModal();
    props.navigation.goBack();
  }, [props.navigation]);

  let onTryAgainPress = useCallback(() => {
    closeModal();
    setCurrentTime(timeLimit);
    setStopTimer(false);
    setAnswer('');
  }, [timeLimit]);

  let TimeIcon = () =>
    React.createElement(SVG.timeSVG, { width: 40, height: 40 });
  let FinishedIcon = () =>
    React.createElement(SVG.finishSVG, { width: 110, height: 110 });
  let FailedIcon = () =>
    React.createElement(SVG.failedSVG, { width: 110, height: 110 });

  let CodeEditor = () => {
    return (
      <View>
        {codeContent.map((code, i) => (
          <View key={i} style={styles.codeContainer}>
            <View
              style={[
                styles.numberContainer,
                {
                  borderTopLeftRadius: i === 0 ? 12 : 0,
                  borderBottomLeftRadius: i === codeContent.length - 1 ? 12 : 0,
                  paddingTop: i === 0 ? 18 : 6,
                  paddingBottom: i === codeContent.length - 1 ? 18 : 6,
                },
              ]}
            >
              <Text style={styles.numberText}>{i + 1}</Text>
            </View>
            <View
              style={[
                styles.codeTextContainer,
                {
                  borderTopRightRadius: i === 0 ? 12 : 0,
                  borderBottomRightRadius:
                    i === codeContent.length - 1 ? 12 : 0,
                  paddingTop: i === 0 ? 18 : 6,
                  paddingBottom: i === codeContent.length - 1 ? 18 : 6,
                },
              ]}
            >
              {code.code === '%' ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <TextInput
                    value={answer}
                    onChangeText={onChangeAnswerField}
                    placeholder="// Enter your code here"
                    style={[
                      styles.codeInput,
                      { marginLeft: 20 * code.tabCount + 8 },
                    ]}
                    editable={isEditable}
                  />
                  <Feather
                    name="delete"
                    size={28}
                    color="#bebebe"
                    style={{ marginHorizontal: 12, alignSelf: 'center' }}
                    onPress={() => {
                      setAnswer('');
                    }}
                  />
                </View>
              ) : (
                <Text
                  style={[
                    styles.codeText,
                    { marginLeft: 20 * code.tabCount + 8 },
                  ]}
                >
                  {code.code}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  let FinishedModalContent = useCallback(() => {
    const finalScore = calculateScore(currentTime, timeLimit, difficulty);

    const finalRewards: Array<Reward> = isFirstTime
      ? [...firstTimeRewards]
      : [];

    if (isFirstTime) {
      // Add bonus coffee beans based on completion time
      finalRewards[0].value =
        Number(finalRewards[0].value) + Math.floor(currentTime / 2000);

      // Add bonus exp based on completion time
      finalRewards[1].value =
        Number(finalRewards[1].value) + Math.floor(currentTime / 2500);

      chanceRewards.forEach((chanceReward) => {
        if (rollRewards(chanceReward)) {
          finalRewards.push(chanceReward);
        }
      });
    }

    let requestBodyObject = {
      username: decodeToken(getFromStorage(LOCALSTORAGE_KEYS.TOKEN) || ''),
      id: stageId,
      levelNo,
      score: finalScore,
      rewards: finalRewards,
    };
    let requestBody = { token: encodeToken(requestBodyObject) };

    homebrewFetch('POST', UPDATE_JOURNEY_PROGRESS_URL, requestBody)
      .then((response) => response.json())
      .then((data: Response) => {
        console.log(data);
      });

    return (
      <View style={styles.modalContentContainer}>
        <FinishedIcon />
        <Text style={styles.modalHeaderText}>Finished!</Text>
        <Text style={styles.modalCompletionTimeText}>
          Completion time: {msToCompletionTime(currentTime, timeLimit)}
        </Text>
        {/* <Text style={styles.modalScoreText}>Score: {finalScore}</Text> */}

        <RewardList rewards={finalRewards} />

        <Button
          title="Back"
          onPress={onHomeButtonPress}
          backgroundColor={COLORS.PRIMARY}
          titleColor={COLORS.PRIMARY_TEXT}
          containerStyle={{
            width: 140,
            borderRadius: 28,
            marginTop: 20,
            height: 48,
          }}
          titleStyle={{
            fontWeight: 'normal',
            fontSize: 18,
          }}
        />
      </View>
    );
  }, [
    currentTime,
    difficulty,
    timeLimit,
    chanceRewards,
    firstTimeRewards,
    isFirstTime,
    onHomeButtonPress,
    levelNo,
    stageId,
  ]);

  let FailedModalContent = useCallback(() => {
    return (
      <View style={styles.modalContentContainer}>
        <FailedIcon />
        <Text style={styles.modalHeaderText}>Failed! :(</Text>
        <Text style={{ marginVertical: 12, fontSize: 18 }}>Time is up!</Text>

        <Button
          title="Try Again"
          onPress={onTryAgainPress}
          backgroundColor={COLORS.PASTEL_SALMON}
          titleColor={COLORS.PRIMARY_TEXT}
          containerStyle={{
            width: 180,
            borderRadius: 28,
            marginTop: 20,
            height: 48,
          }}
          titleStyle={{
            fontWeight: 'normal',
            fontSize: 18,
          }}
        />

        <Button
          title="Home"
          onPress={onHomeButtonPress}
          backgroundColor={COLORS.PRIMARY}
          titleColor={COLORS.PRIMARY_TEXT}
          containerStyle={{
            width: 140,
            borderRadius: 28,
            marginTop: 20,
            height: 48,
          }}
          titleStyle={{
            fontWeight: 'normal',
            fontSize: 18,
          }}
        />
      </View>
    );
  }, [onHomeButtonPress, onTryAgainPress]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!stopTimer) {
        setCurrentTime(currentTime - 1000);
      }
    }, 1000);

    // Time's up
    if (currentTime === 0) {
      clearInterval(intervalId);
      showModal({
        content: FailedModalContent,
        showCloseButton: false,
      });
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTime, stopTimer, FailedModalContent]);

  useEffect(() => {
    if (correctAnswers.includes(answer)) {
      setStopTimer(true);
      setEditable(false);
      showModal({
        content: FinishedModalContent,
        showCloseButton: false,
      });
    }
  }, [answer, correctAnswers, setStopTimer, FinishedModalContent]);

  let onChangeAnswerField = (value: string) => {
    setAnswer(value);
  };

  let onBackButtonPressed = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.leftHeaderContainer}>
            <Feather
              name="arrow-left"
              size={28}
              color={COLORS.LEVEL_TEXT}
              style={{ marginRight: 12 }}
              onPress={onBackButtonPressed}
            />
            <Text style={styles.levelHeaderText}>
              {stageName} - {levelNo}
            </Text>
          </View>

          <View style={styles.rightHeaderContainer}>
            <TimeIcon />
            <Text style={styles.levelHeaderText}>{msToTime(currentTime)}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {content.map((text, i) => (
            <Text key={i} style={styles.levelContentText}>
              {text}
            </Text>
          ))}
          {CodeEditor()}
        </ScrollView>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.expectedResultText}>Expected Output</Text>
        <Phone phoneSkinId={userPhoneSkin} expectedOutput={expectedOutput} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LEVEL_BACKGROUND,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 2,
    paddingLeft: 42,
    paddingRight: 21,
    paddingVertical: 36,
    justifyContent: 'space-between',
  },
  rightContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    borderBottomLeftRadius: 360,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: -1,
      height: 2,
    },
    padding: 48,
    alignItems: 'center',
    maxHeight: 1000,
  },
  levelHeaderText: {
    fontSize: FONT_SIZE.HEADER1,
    color: COLORS.LEVEL_TEXT,
    fontWeight: 'bold',
  },
  levelContentText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'rgba(0,0,0,0.7)',
  },
  contentContainer: {
    flex: 1,
    paddingRight: 21,
  },
  codeContainer: {
    flexDirection: 'row',
  },
  numberContainer: {
    backgroundColor: '#000000',
    paddingVertical: 6,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeTextContainer: {
    backgroundColor: '#313131',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  codeText: {
    fontSize: 16,
    color: '#bebebe',
  },
  numberText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  codeInput: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
    justifyContent: 'space-between',
  },
  leftHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expectedResultText: {
    fontWeight: '700',
    color: COLORS.PRIMARY_TEXT,
    fontSize: 20,
  },
  modalContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderText: {
    marginTop: 12,
    fontSize: FONT_SIZE.HEADER1,
    fontWeight: 'bold',
  },
  modalCompletionTimeText: {
    fontSize: 18,
    marginTop: 12,
  },
  modalScoreText: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: 'bold',
  },
});
