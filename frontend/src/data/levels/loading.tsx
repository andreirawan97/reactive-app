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
        value: 100,
      },
      {
        id: 'exp',
        value: 200,
      },
    ],
    chanceRewards: [],
    timeLimit: 300000,
    levelNo: 1,
    content: [
      `There are many components that available in React Native such as Text, View, and Image.`,
      `You can make a loading indicator by using ActivityIndicator component.`,
    ],
    stageName: 'Loading',
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { View, ActivityIndicator } from 'react-native'`,
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
    correctAnswers: [`<ActivityIndicator/>`, `<ActivityIndicator />`],
    expectedOutput: () => <ActivityIndicator />,
  },
  {
    type: 'fillCode',
    difficulty: 1,
    firstTimeRewards: [
      {
        id: 'currency',
        value: 100,
      },
      {
        id: 'exp',
        value: 200,
      },
    ],
    chanceRewards: [],
    timeLimit: 300000,
    levelNo: 2,
    content: [
      `You can adjust the color of the Activity Indicator by use the color prop.`,
      `For example: "<ActivityIndicator color='green' />"`,
      `Now, make a red Activity Indicator.`,
    ],
    stageName: 'Loading',
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { View, ActivityIndicator } from 'react-native'`,
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
      `<ActivityIndicator color='red'/>`,
      `<ActivityIndicator color='red' />`,
    ],
    expectedOutput: () => <ActivityIndicator color="red" />,
  },
];
