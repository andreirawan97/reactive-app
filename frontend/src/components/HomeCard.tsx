import React, { ReactElement } from 'react';
import { View, StyleSheet, Text } from 'react-native';

type Props = {
  title: string;
  content: () => ReactElement;
  titleIcon: () => ReactElement;
};

export default function HomeCard(props: Props) {
  let { title, content, titleIcon } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>{titleIcon()}</View>
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
