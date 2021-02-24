import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Level } from '../journey';

export const loadingLevels: Array<Level> = [
  {
    type: 'fillCode',
    difficulty: 1,
    firstTimeRewards: [
      {
        id: 'currency',
        value: 1000,
      },
      {
        id: 'exp',
        value: 200,
      },
    ],
    chanceRewards: [],
    timeLimit: 100000,
    levelNo: 1,
    content: [
      `There are many components that available in React Native such as Text, View, and Image.`,
      `You can make a loading indicator by using ActivityIndicator component.`
    ],
    stageName: 'Potrait',
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
    correctAnswers: [
      `<ActivityIndicator/>`,
      `<ActivityIndicator />`,
    ],
    expectedOutput: () => (
      <ActivityIndicator />
    ),
  },
];