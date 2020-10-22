import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';

import { journey, Section, Stage } from '../../../data/journey';
import { FONT_SIZE, COLORS } from '../../../constants/styles';
import { NavigationScreenProps } from '../../../types/navigation';
import { FIREBASE_URL, ENDPOINT } from '../../../constants/network';
import { decodeToken } from '../../../helpers/token';
import { getFromStorage } from '../../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../../constants/keys';
import { Fetcher } from '../../../core-ui';
import { Response } from '../../../types/firestore';
import { UserJourney, dummyUserJourney } from '../../../fixtures/journey';
import SVG from '../../../../assets/svg';
import { LevelButton } from '../../../components';

const getUserJourneyURL = `${FIREBASE_URL}${ENDPOINT.GET_USER_JOURNEY}`;
const requestBody = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };

type Props = {
  userPhoneSkin: string;
} & NavigationScreenProps;

export default function JourneyScene(props: Props) {
  const [userJourney, setUserJourney] = useState<UserJourney>(dummyUserJourney);
  const [currentStage, setCurrentStage] = useState(journey[0].stages[0]);

  const onSuccessFetch = useCallback((response: Response) => {
    let { token } = response;
    let data = decodeToken(token) as UserJourney;
    setUserJourney(data);
  }, []);

  let LockIcon = () =>
    React.createElement(SVG.lockSVG, { width: 50, height: 50 });

  let StageComponent = (props: Stage) => {
    let { name, icon } = props;

    const StageIcon = icon;
    return (
      <TouchableOpacity
        style={styles.stageContainer}
        onPress={() => setCurrentStage(props)}
      >
        <View style={styles.stageIcon}>
          <StageIcon />
        </View>
        <Text style={styles.stageNameText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  let SectionComponent = (props: Section & { index: number }) => {
    let { name, stages, index } = props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>
          {index + 1}. {name}
        </Text>
        {stages.map((stage, i) => (
          <StageComponent
            key={i}
            id={stage.id}
            name={stage.name}
            description={stage.description}
            levels={stage.levels}
            icon={stage.icon}
          />
        ))}
      </View>
    );
  };

  const animatedTranslateValue = new Animated.Value(150);
  const animatedFadeValue = new Animated.Value(0);

  Animated.parallel([
    Animated.timing(animatedTranslateValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(animatedFadeValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }),
  ]).start();

  const animatedStyle = {
    transform: [{ translateX: animatedTranslateValue }],
    opacity: animatedFadeValue,
  };

  return (
    <Fetcher
      method="POST"
      URL={getUserJourneyURL}
      onSuccess={onSuccessFetch}
      requestBody={requestBody}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.stagesContainer}>
          {journey.map((section, i) => (
            <SectionComponent
              key={i}
              index={i}
              name={section.name}
              stages={section.stages}
            />
          ))}
        </ScrollView>
        <Animated.View style={[styles.levelsContainer, animatedStyle]}>
          <Text style={styles.levelsStageNameText}>{currentStage.name}</Text>
          <Text style={styles.stageDescriptionText}>
            {currentStage.description}
          </Text>

          <View style={styles.levelsSelectorContainer}>
            {currentStage.levels.map((level, i) => {
              if (userJourney[currentStage.id][i].unlocked) {
                return (
                  <LevelButton
                    key={i}
                    index={i}
                    highScore={userJourney[currentStage.id][i].highScore}
                    onPress={() =>
                      props.navigation.navigate('LevelScene', {
                        currentLevelData: level,
                        currentLevelUserData: userJourney,
                        stageId: currentStage.id,
                        userPhoneSkin: props.userPhoneSkin,
                      })
                    }
                  />
                );
              } else {
                return (
                  <TouchableOpacity key={i} style={styles.lockedLevelSelector}>
                    <LockIcon />
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </Animated.View>
      </View>
    </Fetcher>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
  },
  stagesContainer: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 24,
  },
  levelsContainer: {
    flex: 4,
    padding: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: -1,
      height: 2,
    },
  },
  sectionHeaderText: {
    fontSize: FONT_SIZE.HEADER2,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    width: '100%',
  },
  stageContainer: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stageNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  levelsStageNameText: {
    fontSize: FONT_SIZE.HEADER2,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stageDescriptionText: {
    fontSize: FONT_SIZE.CAPTION,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 24,
  },
  levelsSelectorContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lockedLevelSelector: {
    borderRadius: 20,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a0a0a0',
    marginBottom: 20,
    marginRight: 20,
  },
  stageIcon: {
    marginRight: 20,
  },
});
