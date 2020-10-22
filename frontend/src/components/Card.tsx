import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
  title?: string;
  content: () => ReactElement;
  titleIcon?: () => ReactElement;
  containerStyle?: ViewStyle;
};

export default function Card(props: Props) {
  let { title, content, titleIcon, containerStyle } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        {titleIcon && <View style={styles.imageContainer}>{titleIcon()}</View>}
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.contentContainer}>{content()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  imageContainer: {
    marginRight: 12,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
});
