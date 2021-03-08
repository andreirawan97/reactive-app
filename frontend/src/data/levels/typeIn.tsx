import React from 'react';
import { TextInput } from 'react-native';

import { Level } from '../journey';

export const typeInLevels: Array<Level> = [
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
      `A foundational component for inputting text into the app via a keyboard.`,
      `Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.`,
      `The most basic prop is "value". You can define a default value to your Text Input using "value" property.`,
      `Example: <TextInput value="Default value" />`,
      `For this level, make John Doe as the default value.`,
    ],
    stageName: 'Type In',
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { TextInput } from 'react-native'`,
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
        code: `<TextInput`,
        tabCount: 1,
      },
      {
        code: `%`,
        tabCount: 2,
      },
      {
        code: `/>`,
        tabCount: 1,
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
      `value='John Doe'`,
      `value="John Doe"`,
      `value = 'John Doe'`,
      `value = "John Doe"`,
    ],
    expectedOutput: () => <TextInput value="John Doe" />,
  },
  {
    levelNo: 2,
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
    content: [
      `Placeholder is different than value.`,
      `Placeholder is the string that will be rendered before text input has been entered.`,
      `You can add a placeholder by using "placeholder" prop.`,
      `Now make a text input with "Input phone number" placeholder.`,
    ],
    stageName: 'Type In',
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { TextInput } from 'react-native'`,
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
        code: `<TextInput`,
        tabCount: 2,
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
      `placeholder='Input phone number'`,
      `placeholder="Input phone number"`,
      `placeholder = 'Input phone number'`,
      `placeholder = "Input phone number"`,
    ],
    expectedOutput: () => <TextInput placeholder="Input phone number" />,
  },
  {
    levelNo: 3,
    type: 'fillCode',
    difficulty: 2,
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
    content: [
      `Unlike the HTML and JS, we don't use document.getElementById.`,
      `Instead, we use a property called "onChangeText" to read the user input.`,
      `Everytime the user type something, "onChangeText" will be called.`,
      `We also need a state to save the user input.`,
      `Now, type the missing code so our Text Input can work properly.`,
    ],
    stageName: 'Type In',
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { TextInput } from 'react-native'`,
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
        code: `const [value, onChangeText] = React.useState("")`,
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
        code: `<TextInput`,
        tabCount: 2,
      },
      {
        code: `value={value}`,
        tabCount: 3,
      },
      {
        code: `%`,
        tabCount: 3,
      },
      {
        code: `/>`,
        tabCount: 1,
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
      `onChangeText={onChangeText}`,
      `onChangeText={ onChangeText }`,
      `onChangeText = {onChangeText}`,
      `onChangeText = { onChangeText }`,
    ],
    expectedOutput: () => <TextInput />,
  },
  {
    levelNo: 4,
    type: 'fillCode',
    difficulty: 2,
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
    content: [
      `Now, you will notice that our Text Input looks dull. Add style to it.`,
    ],
    stageName: 'Type In',
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { TextInput, StyleSheet } from 'react-native'`,
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
        code: `<TextInput`,
        tabCount: 2,
      },
      {
        code: `placeholder="Now i look better"`,
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
        code: ``,
        tabCount: 1,
      },
      {
        code: `const styles = StyleSheet.create({`,
        tabCount: 1,
      },
      {
        code: `coolTextInput: {`,
        tabCount: 2,
      },
      {
        code: `paddingVertical: 8`,
        tabCount: 3,
      },
      {
        code: `paddingHorizontal: 12`,
        tabCount: 3,
      },
      {
        code: `borderWidth: 1`,
        tabCount: 3,
      },
      {
        code: `borderColor: 'silver'`,
        tabCount: 3,
      },
      {
        code: `borderRadius: 12`,
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
    correctAnswers: [
      `style={styles.coolTextInput}`,
      `style={ styles.coolTextInput }`,
      `style = {styles.coolTextInput}`,
      `style = { styles.coolTextInput }`,
    ],
    expectedOutput: () => (
      <TextInput
        placeholder="Now i look better"
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: 'silver',
          borderRadius: 12,
        }}
      />
    ),
  },
  {
    levelNo: 5,
    type: 'fillCode',
    difficulty: 2,
    firstTimeRewards: [
      {
        id: 'currency',
        value: 200,
      },
      {
        id: 'exp',
        value: 250,
      },
    ],
    chanceRewards: [],
    timeLimit: 200000,
    content: [
      `You can hide user input by set "secureTextEntry" to true. This is useful if user wants type password.`,
    ],
    stageName: 'Type In',
    codeContent: [
      {
        code: `import React from 'react'`,
        tabCount: 0,
      },
      {
        code: `import { TextInput } from 'react-native'`,
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
        code: `<TextInput`,
        tabCount: 2,
      },
      {
        code: `value={value}`,
        tabCount: 3,
      },
      {
        code: `%`,
        tabCount: 3,
      },
      {
        code: `/>`,
        tabCount: 1,
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
      `secureTextEntry={true}`,
      `secureTextEntry={ true }`,
      `secureTextEntry = {true}`,
      `secureTextEntry = { true }`,
    ],
    expectedOutput: () => <TextInput value="secret" secureTextEntry={true} />,
  },
];
