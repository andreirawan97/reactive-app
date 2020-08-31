import React from 'react';
import {
  Button as RawButton,
  ButtonProps,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import { COLORS } from '../constants/styles';

type Props = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
};
export default function Button(props: Props) {
  let {
    title,
    onPress,
    backgroundColor,
    titleColor,
    containerStyle,
    titleStyle,
  } = props;

  const BUTTON_COLOR = backgroundColor || COLORS.PRIMARY;
  const TITLE_COLOR = titleColor || COLORS.PRIMARY_TEXT;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: BUTTON_COLOR },
        containerStyle,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.title, titleStyle, { color: TITLE_COLOR }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
