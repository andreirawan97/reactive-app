import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useHover } from '@expo/style-utils';

import { COLORS } from '../constants/styles';

type Props = {
  index: number;
  onPress: () => void;
  highScore: number;
};

export default function LevelButton(props: Props) {
  let { index, onPress, highScore } = props;

  const ref = useRef(null);
  const { isHovered } = useHover(ref);

  const HighScoreTooltip = (
    <View style={styles.highScoreContainer}>
      <Text style={styles.highScoreText} numberOfLines={1}>
        High Score: {highScore}
      </Text>
    </View>
  );

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {isHovered && HighScoreTooltip}
      <TouchableOpacity
        ref={ref}
        style={styles.levelSelector}
        onPress={onPress}
      >
        <Text style={styles.levelText}>{index + 1}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  levelSelector: {
    borderRadius: 20,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 20,
    marginRight: 20,
    zIndex: 0,
  },
  levelText: {
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
    fontSize: 36,
  },
  highScoreContainer: {
    position: 'absolute',
    backgroundColor: '#313131',
    paddingVertical: 8,
    paddingHorizontal: 12,
    bottom: -20,
    right: -14,
    width: 160,
    zIndex: 1,
    borderRadius: 6,
  },
  highScoreText: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
});
