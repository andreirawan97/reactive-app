import React, { useState, ReactElement } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { COLORS, FONT_SIZE } from '../constants/styles';

export type Content = {
  headerText: string;
  component: () => ReactElement;
};

type Props = {
  contents: Array<Content>;
  containerStyle?: ViewStyle;
  onChangeSwitcher?: (newIndex: number) => void;
};

export default function Switcher(props: Props) {
  let { contents, containerStyle, onChangeSwitcher } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  let onPressSwitcher = (newIndex: number) => {
    onChangeSwitcher && onChangeSwitcher(newIndex);
    setSelectedIndex(newIndex);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headersContainer}>
        <ScrollView horizontal={true}>
          {contents.map((content, i) => {
            return i === selectedIndex ? (
              <TouchableOpacity
                key={i}
                style={styles.headerTextContainer}
                onPress={() => onPressSwitcher(i)}
              >
                <Text style={styles.selectedHeaderText}>
                  {content.headerText}
                </Text>
                <View style={styles.selectedHeaderPointer} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={i}
                style={styles.headerTextContainer}
                onPress={() => onPressSwitcher(i)}
              >
                <Text style={styles.headerText}>{content.headerText}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ flex: 1, marginTop: 12 }}>
        <ScrollView>{contents[selectedIndex].component()}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedHeaderText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZE.HEADER2,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedHeaderPointer: {
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
  },
  headerText: {
    color: '#3A405F',
    fontSize: FONT_SIZE.HEADER2,
    fontWeight: 'bold',
  },
  headerTextContainer: {
    marginRight: 38,
  },
  headersContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
});
