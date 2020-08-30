import React, { ReactElement } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import phoneSkins, { PhoneSkin } from '../data/phoneSkins';

type Props = {
  phoneSkinId: string;
  expectedOutput: () => ReactElement;
};

export default function Phone(props: Props) {
  let { phoneSkinId, expectedOutput } = props;

  let selectedPhoneSkin = phoneSkins[phoneSkinId];

  return (
    <View>
      <Image
        source={selectedPhoneSkin.source}
        style={{
          width: selectedPhoneSkin.dimension.width,
          height: selectedPhoneSkin.dimension.height,
          resizeMode: 'contain',
        }}
      />
      <View
        style={[
          styles.rendererView,
          {
            top: selectedPhoneSkin.renderArea.offset.top,
            left: selectedPhoneSkin.renderArea.offset.left,
            width: selectedPhoneSkin.renderArea.width,
            height: selectedPhoneSkin.renderArea.height,
          },
        ]}
      >
        {expectedOutput()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rendererView: {
    position: 'absolute',
    zIndex: 1,
    padding: 5,
  },
});
