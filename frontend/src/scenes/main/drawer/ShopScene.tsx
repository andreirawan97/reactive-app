import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Switcher } from '../../../core-ui';
import { Content } from '../../../core-ui/Switcher';

type Props = {};
export default function ShopScene(props: Props) {
  let testScene = () => (
    <View>
      <Text>Test</Text>
    </View>
  );

  let contents: Array<Content> = [
    {
      headerText: 'Avatar Border',
      component: testScene,
    },
    {
      headerText: 'Phone Skin',
      component: testScene,
    },
  ];
  return (
    <View style={styles.container}>
      <Switcher contents={contents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fafafa',
  },
});
