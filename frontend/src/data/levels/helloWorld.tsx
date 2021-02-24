import React from 'react';
import { Text, View } from 'react-native';

import { Level } from '../journey';

export const helloWorldLevels: Array<Level> = [
  {
    type: 'fillCode',
    stageName: 'Hello World',
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
    chanceRewards: [
      {
        id: 'avatar',
        value: 'fallenCoder',
        chance: 0.1,
      },
    ],
    timeLimit: 300000,
    difficulty: 1,
    levelNo: 1,
    content: [
      'Text is one of the most important element in mobile app. For example the one that you are looking at. Yes this one.',
      "In React Native, it's quite easy to write a simple bug-free Hello World! You Just need to add Text element and text that you want to show inside it.",
      'For example "<Text>The content of the Text</Text>"',
      `Now, write your own text to show 'Hello World!'. Without the single quote mark of course.`,
    ],
    correctAnswers: ['<Text>Hello World!</Text>'],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { Text } from 'react-native'`,
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
    expectedOutput: () => <Text>Hello World!</Text>,
  },
  {
    type: 'fillCode',
    stageName: 'Hello World',
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
    timeLimit: 100000,
    difficulty: 1,
    levelNo: 2,
    content: [
      `Make another Text that says 'I Am Groot'. Without the quotation mark of course.`,
    ],
    correctAnswers: ['<Text>I Am Groot</Text>'],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { Text } from 'react-native'`,
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
    expectedOutput: () => <Text>I Am Groot</Text>,
  },
  {
    type: 'fillCode',
    stageName: 'Hello World',
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
    levelNo: 3,
    content: [
      `In React Native, you style your application using JavaScript.`,
      `Almost all React Native component have a prop named "style"`,
      `The style names and values usually match how CSS works on the web, except names are written using camel casing, e.g. backgroundColor rather than background-color`,
      `Example: "<Text style={{color: 'blue'}}>This text will be blue</Text>"`,
      `For this level, please make a text that says 'I Am Red'.`,
    ],
    correctAnswers: [
      `<Text style={{color: 'red'}}>I Am Red</Text>`,
      `<Text style={{color: "red"}}>I Am Red</Text>`,
      `<Text style={{color:'red'}}>I Am Red</Text>`,
      `<Text style={{color:"red"}}>I Am Red</Text>`,
    ],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { Text } from 'react-native'`,
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
    expectedOutput: () => <Text style={{ color: 'red' }}>I Am Red</Text>,
  },
  {
    type: 'fillCode',
    stageName: 'Hello World',
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
    difficulty: 1,
    levelNo: 4,
    content: [
      `You can also print value from a variable.`,
      `To do this, you need to wrap the variable name with curly bracket. For example "<Text>{variableName}</Text>`,
      `For this level, you need to show the answer of a basic math operation.`,
    ],
    correctAnswers: [
      `<Text>{answer}</Text>`,
    ],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { Text } from 'react-native'`,
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
        code: `const phi = 3.14;`,
        tabCount: 1,
      },
      {
        code: `const r = 3;`,
        tabCount: 1,
      },
      {
        code: `const answer = phi * r * r;`,
        tabCount: 1,
      },
      {
        code: ``,
        tabCount: 1,
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
    expectedOutput: () => <Text>28.259</Text>,
  },
  {
    type: 'fillCode',
    stageName: 'Hello World',
    firstTimeRewards: [
      {
        id: 'currency',
        value: 250,
      },
      {
        id: 'exp',
        value: 200,
      },
    ],
    chanceRewards: [],
    timeLimit: 400000,
    difficulty: 1,
    levelNo: 5,
    content: [
      `You can also replace the style object with a variable.`,
      `This variable is created with StyleSheet class that provided by React Native.`,
      `For this level, write code that produce the expected output.`,
    ],
    correctAnswers: [
      `<Text style={styles.redText}>Red</Text>`,
    ],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { Text, StyleSheet } from 'react-native'`,
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
        code: `<View style={styles.row}>`,
        tabCount: 2,
      },
      {
        code: `<Text style={styles.blueText}>Blue</Text>`,
        tabCount: 3,
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
        code: ``,
        tabCount: 1,
      },
      {
        code: `const styles = StyleSheet.create({`,
        tabCount: 1,
      },
      {
        code: `row: {`,
        tabCount: 2,
      },
      {
        code: `flexDirection: "row"`,
        tabCount: 3,
      },
      {
        code: `},`,
        tabCount: 2,
      },
      {
        code: `blueText: {`,
        tabCount: 2,
      },
      {
        code: `color: "blue"`,
        tabCount: 3,
      },
      {
        code: `marginRight: 8`,
        tabCount: 3,
      },
      {
        code: `},`,
        tabCount: 2,
      },
      {
        code: `redText: {`,
        tabCount: 2,
      },
      {
        code: `color: "red"`,
        tabCount: 3,
      },
      {
        code: `}`,
        tabCount: 2,
      },
      {
        code: `})`,
        tabCount: 1,
      },
      {
        code: `}`,
        tabCount: 0,
      },
    ],
    expectedOutput: () => <View style={{flexDirection: "row"}}>
      <Text style={{color: 'blue', marginRight: 8}}>Blue</Text>
      <Text style={{color: 'red'}}>Red</Text>
    </View>,
  },
];
