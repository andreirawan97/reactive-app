import React from 'react';
import { Text } from 'react-native';

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
    // chanceRewards: [
    //   {
    //     id: 'avatar',
    //     value: '',
    //     chance: 0.1,
    //   },
    // ],
    chanceRewards: [],
    timeLimit: 300000,
    difficulty: 1,
    levelNo: 1,
    content: [
      'Text is one of the most important element in mobile app. For example the one that you are looking at. Yes this one.',
      "In React Native, it's quite easy to write a simple bug-free Hello World! You Just need to add Text element and text that you want to show inside it.",
      'For example <Text>Text is one of the most important element...</Text>',
      `Now, write your own text to show "Hello World!". Without the quotation mark of course.`,
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
      `Make another Text that says "I Am Groot". Without the quotation mark of course.`,
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
      `Example: <Text style={{color: 'blue'}}>This text will be blue</Text>`,
      `For this level, please make a text that says "I Am Red".`,
      `Important note: Please make the add a single space before the style value and use '' not "". color:"red" and color: 'red' might produce the same output but we judge your result by the text, not by output.`,
    ],
    correctAnswers: [`<Text style={{color: 'red'}}>I Am Red</Text>`],
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
];
