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
    timeLimit: 300000,
    difficulty: 1,
    levelNo: 1,
    content: [
      `In this stage, you will learn the basic about View. View component is the most fundamental component for builing an UI.`,
      `View is equivalent on whatever platform React Native is running on, whether that is a UIView (iOS), android.view (Android), and <div> (Web).`,
      `Now make a text that says "I am inside a view"`,
    ],
    correctAnswers: [`<Text>I am inside a view</Text>`],
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
        code: `<View>`,
        tabCount: 2,
      },
      {
        code: `%`,
        tabCount: 3,
      },
      {
        code: `</View>`,
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
    expectedOutput: () => (
      <View>
        <Text>I am inside a view</Text>
      </View>
    ),
  },
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
    levelNo: 2,
    content: [
      `You can pass style property to configure the style of the View component.`,
      `Now, you need to make a red View that fill the screen.`,
      `Hint: It's something like "<View style={{flex: 1, backgroundColor: 'green'}} />"`,
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
    levelNo: 3,
    content: [
      `It's time to change the View direction.`,
      `You can pass "flexDirection" key inside style object. You can put row, column, row-reverse, and column-reverse as its value`,
      `Add "flexDirection" to code below to produce expected output.`,
    ],
    correctAnswers: [
      `style={{flexDirection: "row"}}`,
      `style={{ flexDirection: "row" }}`,
      `style={{flexDirection:"row"}}`,
      `style={{ flexDirection:"row" }}`,
      `style={{flexDirection: 'row'}}`,
      `style={{ flexDirection: 'row' }}`,
      `style={{flexDirection:'row'}}`,
      `style={{ flexDirection:'row' }}`,
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
        code: `<View`,
        tabCount: 2,
      },
      {
        code: `%`,
        tabCount: 2,
      },
      {
        code: `>`,
        tabCount: 2,
      },
      {
        code: `<Text>Text 1 </Text>`,
        tabCount: 3,
      },
      {
        code: `<Text>Text 2</Text>`,
        tabCount: 3,
      },
      {
        code: `</View>`,
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
    expectedOutput: () => (
      <View style={{ flexDirection: 'row' }}>
        <Text>Text 1 </Text>
        <Text>Text 2</Text>
      </View>
    ),
  },
];
