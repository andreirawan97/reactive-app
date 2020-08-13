import React from 'react';
import {
  View,
  TextInput as RawTextInput,
  TextInputProps,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { FONT_SIZE } from '../constants/styles';

type Props = {
  label?: string;
  containerStyle?: ViewStyle;
} & TextInputProps;

export default function TextInput(props: Props) {
  let { label, containerStyle } = props;

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.textInputContainer}>
        <RawTextInput {...props} style={styles.textInput} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#3A405F',
    marginBottom: 8,
    fontSize: FONT_SIZE.PARAGRAPH1,
  },
  textInputContainer: {
    backgroundColor: '#F2F5FA',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderColor: '#F2F5FA',
    borderRadius: 12,
  },
  textInput: {
    fontSize: FONT_SIZE.PARAGRAPH1,
  },
});
