import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Level } from '../journey';

export const touchableLevels: Array<Level> = [
  {
    type: 'fillCode',
    stageName: 'Touchable',
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
    levelNo: 1,
    content: [
      `Touchable Opacity is a component that can detect a press interactions.`,
      `Just like View component, Touchable Opacity can have another component inside it.`,
      `In this level, wrap a text that says "Press Me" with Touchable Opacity.`,
    ],
    correctAnswers: [`<Text>Press Me</Text>`],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { Text, TouchableOpacity } from 'react-native'`,
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
        code: `<TouchableOpacity>`,
        tabCount: 2,
      },
      {
        code: `%`,
        tabCount: 3,
      },
      {
        code: `</TouchableOpacity>`,
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
      <TouchableOpacity>
        <Text>Press Me</Text>
      </TouchableOpacity>
    ),
  },
  {
    type: 'fillCode',
    stageName: 'Touchable',
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
    levelNo: 2,
    content: [
      `Now, let's make our Touchable do something.`,
      `We can add "onPress" property that receive a function. For example: "onPress={someFunction}".`,
      `"onPress" will run the function after it detects a touch.`,
      `Now make our button to add a number everytime it is being pressed.`,
    ],
    correctAnswers: [`onPress={addNumber}`, `onPress={ addNumber }`],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { TouchableOpacity, Text } from 'react-native'`,
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
        code: `const [number, setNumber] = React.useState(0)`,
        tabCount: 1,
      },
      {
        code: `const addNumber = () => {`,
        tabCount: 1,
      },
      {
        code: `setNumber(number+1)`,
        tabCount: 2,
      },
      {
        code: `}`,
        tabCount: 1,
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
        code: `<TouchableOpacity`,
        tabCount: 3,
      },
      {
        code: `%`,
        tabCount: 4,
      },
      {
        code: `>`,
        tabCount: 3,
      },
      {
        code: `<Text>Press Me</Text>`,
        tabCount: 4,
      },
      {
        code: `</TouchableOpacity>`,
        tabCount: 3,
      },
      {
        code: `<Text>Number: {number}</Text>`,
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
    expectedOutput: () => {
      const [_number, _setNumber] = React.useState(0);
      const plusOne = () => {
        _setNumber(_number + 1);
      };
      return (
        <View>
          <TouchableOpacity onPress={plusOne}>
            <Text>Press Me</Text>
          </TouchableOpacity>
          <Text>Number: {_number}</Text>
        </View>
      );
    },
  },
  {
    type: 'fillCode',
    stageName: 'Touchable',
    firstTimeRewards: [
      {
        id: 'currency',
        value: 150,
      },
      {
        id: 'exp',
        value: 200,
      },
    ],
    chanceRewards: [],
    timeLimit: 250000,
    difficulty: 1,
    levelNo: 3,
    content: [
      `Our button doesn't look like a button. It misses background color and more.`,
      `Implement the correct style to match the expected output.`,
    ],
    correctAnswers: [`style={styles.button2}`, `onPress={ styles.button2 }`],
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { TouchableOpacity, Text, StyleSheet } from 'react-native'`,
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
        code: `const [number, setNumber] = React.useState(0)`,
        tabCount: 1,
      },
      {
        code: `const addNumber = () => {`,
        tabCount: 1,
      },
      {
        code: `setNumber(number+1)`,
        tabCount: 2,
      },
      {
        code: `}`,
        tabCount: 1,
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
        code: `<TouchableOpacity`,
        tabCount: 3,
      },
      {
        code: `onPress={addNumber}`,
        tabCount: 4,
      },
      {
        code: `%`,
        tabCount: 4,
      },
      {
        code: `>`,
        tabCount: 3,
      },
      {
        code: `<Text>Press Me</Text>`,
        tabCount: 4,
      },
      {
        code: `</TouchableOpacity>`,
        tabCount: 3,
      },
      {
        code: `<Text style={styles.text}>Number: {number}</Text>`,
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

      {
        code: `const styles = StyleSheet.create({`,
        tabCount: 0,
      },
      {
        code: `button1: {`,
        tabCount: 1,
      },
      {
        code: `padding: 12,`,
        tabCount: 2,
      },
      {
        code: `backgroundColor: "blue",`,
        tabCount: 2,
      },
      {
        code: `borderRadius: 8,`,
        tabCount: 2,
      },
      {
        code: `},`,
        tabCount: 1,
      },
      {
        code: `button2: {`,
        tabCount: 1,
      },
      {
        code: `padding: 12,`,
        tabCount: 2,
      },
      {
        code: `backgroundColor: "red",`,
        tabCount: 2,
      },
      {
        code: `borderRadius: 8,`,
        tabCount: 2,
      },
      {
        code: `}`,
        tabCount: 1,
      },
      {
        code: `text: {`,
        tabCount: 1,
      },
      {
        code: `color: "white"`,
        tabCount: 2,
      },
      {
        code: `}`,
        tabCount: 1,
      },
      {
        code: `})`,
        tabCount: 0,
      },
    ],
    expectedOutput: () => {
      const [_number, _setNumber] = React.useState(0);
      const plusOne = () => {
        _setNumber(_number + 1);
      };
      return (
        <View>
          <TouchableOpacity
            style={{ padding: 12, backgroundColor: 'red', borderRadius: 8 }}
            onPress={plusOne}
          >
            <Text style={{ color: 'white' }}>Press Me</Text>
          </TouchableOpacity>
          <Text>Number: {_number}</Text>
        </View>
      );
    },
  },
];
