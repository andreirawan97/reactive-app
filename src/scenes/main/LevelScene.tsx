import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { NavigationScreenProps } from '../../types/navigation';
import { COLORS, FONT_SIZE } from '../../constants/styles';
import { Level } from '../../data/journey';
import { Phone } from '../../components';

type Props = {} & NavigationScreenProps;

export default function LevelScene(props: Props) {
  const [answer, setAnswer] = useState('');

  let {
    codeContent,
    content,
    levelNo,
    stageName,
    expectedOutput,
    correctAnswer,
  } = props.route.params as Level;

  let cleanup = () => {
    setAnswer('');
  };

  let onChangeAnswerField = (value: string) => {
    setAnswer(value);
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  useEffect(() => {
    if (answer === correctAnswer) {
      console.log('BENAR!');
    }
  }, [answer, correctAnswer]);

  let CodeEditor = () => {
    return (
      <View>
        {codeContent.map((code, i) => (
          <View key={i} style={styles.codeContainer}>
            <View
              style={[
                styles.numberContainer,
                { borderTopLeftRadius: i === 0 ? 12 : 0 },
                {
                  borderBottomLeftRadius: i === codeContent.length - 1 ? 12 : 0,
                },
              ]}
            >
              <Text style={styles.numberText}>{i + 1}</Text>
            </View>
            <View
              style={[
                styles.codeTextContainer,
                { borderTopRightRadius: i === 0 ? 12 : 0 },
                {
                  borderBottomRightRadius:
                    i === codeContent.length - 1 ? 12 : 0,
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
                      { marginLeft: 20 * code.tabCount },
                    ]}
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
                  style={[styles.codeText, { marginLeft: 20 * code.tabCount }]}
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

  let onBackButtonPressed = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.headerContainer}>
          <Feather
            name="arrow-left"
            size={28}
            color={COLORS.LEVEL_TEXT}
            style={{ marginRight: 12 }}
            onPress={onBackButtonPressed}
          />
          <Text style={styles.levelNameText}>
            {stageName} - {levelNo}
          </Text>
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
        <Phone phoneSkinId="iphone6" expectedOutput={expectedOutput} />
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
  levelNameText: {
    fontSize: FONT_SIZE.HEADER1,
    color: COLORS.LEVEL_TEXT,
    fontWeight: 'bold',
  },
  levelContentText: {
    fontSize: FONT_SIZE.PARAGRAPH1,
    marginBottom: 20,
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
    paddingVertical: 12,
    width: 60,
    alignItems: 'center',
  },
  codeTextContainer: {
    backgroundColor: '#313131',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
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
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
  },
  expectedResultText: {
    fontWeight: '700',
    color: COLORS.PRIMARY_TEXT,
    fontSize: 20,
  },
});
