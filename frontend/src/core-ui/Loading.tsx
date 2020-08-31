import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { COLORS } from '../constants/styles';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={COLORS.PRIMARY} size={48} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
