import React from 'react';
import { Text, View } from 'react-native';

import { Level } from '../journey';

export const perspectiveLevels: Array<Level> = [
  {
    type: 'fillCode',
    stageName: 'Perspective',
    firstTimeRewards: [
      {
        id: 'currency',
        value: 200,
      },
      {
        id: 'exp',
        value: 200,
      },
    ],
    chanceRewards: [],
    timeLimit: 180000,
    difficulty: 1,
    levelNo: 1,
    content: [
      `In this stage, you will learn the basic about View. View component is the most fundamental component for builing an UI.`,
      `View is equivalent on whatever platform React Native is running on, whether that is a UIView (iOS), android.view (Android), and <div> (Web).`,
      `In this example, you need to make a red View that fill the screen.`,
      `Hint: It's something like <View style={{flex: 1, backgroundColor: 'green'}} />`,
    ],
    correctAnswers: [
      `<View style={{flex: 1, backgroundColor: 'red'}} />`,
      `<View style={{flex: 1, backgroundColor: 'red'}}></View>`,
    ],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { View } from 'react-native'`,
        tabCount: 0,
      },
      {
        code: ``,
        tabCount: 0,
      },
      {
        code: `export default function App() {`,
        tabCount: 0,
      },
      {
        code: `return (`,
        tabCount: 1,
      },
      {
        code: `%`,
        tabCount: 2,
      },
      {
        code: `)`,
        tabCount: 1,
      },
      {
        code: `}`,
        tabCount: 0,
      },
    ],
    expectedOutput: () => <View style={{ flex: 1, backgroundColor: 'red' }} />,
  },
];
