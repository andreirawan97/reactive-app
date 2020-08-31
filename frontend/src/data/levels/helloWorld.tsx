import React from 'react';
import { Text } from 'react-native';

import { Level } from '../journey';

export const helloWorldLevels: Array<Level> = [
  {
    type: 'fillCode',
    stageName: 'Hello World',
    levelNo: 1,
    content: [
      'Text is one of the most important element in mobile app. For example the one that you are looking at. Yes this one.',
      "In React Native, it's quite easy to write a simple bug-free Hello World! You Just need to add Text element and text that you want to show inside it.",
      'For example <Text>Text is one of the most important element...</Text>',
      `Now, write your own text to show "Hello World!". Without the quotation mark of course.`,
    ],
    correctAnswer: '<Text>Hello World!</Text>',
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
    levelNo: 2,
    content: [
      `Make another Text that says "I Am Groot". Without the quotation mark of course.`,
    ],
    correctAnswer: '<Text>I Am Groot</Text>',
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
];
