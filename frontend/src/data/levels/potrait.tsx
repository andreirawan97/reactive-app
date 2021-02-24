import React from 'react';
import { Image, Text, View } from 'react-native';

import { Level } from '../journey';

export const potraitLevels: Array<Level> = [
  {
    type: 'fillCode',
    difficulty: 1,
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
        value: 'millionaire',
        chance: 0.1,
      },
    ],
    timeLimit: 300000,
    levelNo: 1,
    content: [
      `A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.`,
      `We can show image from base64, uri, or imported from local directory.`,
      `You can pass an object and define the uri inside source prop.`,
      `For example "source={{uri: 'https://somewebsite.com/image/123'}}"`,
      `Now, for this level, show an image from uri 'https://reactnative.dev/img/tiny_logo.png'`,
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
        code: `<Image`,
        tabCount: 2,
      },
      {
        code: `style={{width: 100, height: 100}}`,
        tabCount: 3,
      },
      {
        code: `source={{`,
        tabCount: 3,
      },
      {
        code: `%`,
        tabCount: 4,
      },
      {
        code: `}}`,
        tabCount: 3,
      },
      {
        code: `/>`,
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
      `uri: 'https://reactnative.dev/img/tiny_logo.png'`,
      `uri:'https://reactnative.dev/img/tiny_logo.png'`,
      `uri: "https://reactnative.dev/img/tiny_logo.png"`,
      `uri:"https://reactnative.dev/img/tiny_logo.png"`,
    ],
    expectedOutput: () => (
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={{ width: 100, height: 100 }}
      />
    ),
  },
  {
    type: 'fillCode',
    difficulty: 1,
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
    levelNo: 2,
    content: [
      `Now we will learn how to show an image from local project directory.`,
      `Instead of pass an object, you just need to use "require()".`,
      `For example "source={require('path/to/image.png')}"`,
      `Now show an image from '../assets/react-native-logo.png'`,
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
        code: `<Image`,
        tabCount: 2,
      },
      {
        code: `style={{width: 100, height: 100}}`,
        tabCount: 3,
      },
      {
        code: `%`,
        tabCount: 3,
      },
      {
        code: `/>`,
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
      `source={require('../assets/react-native-logo.png')}`,
      `source={require("../assets/react-native-logo.png")}`,
      `source={ require('../assets/react-native-logo.png') }`,
      `source={ require("../assets/react-native-logo.png") }`,
    ],
    expectedOutput: () => (
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={{ width: 100, height: 100 }}
      />
    ),
  },
];
