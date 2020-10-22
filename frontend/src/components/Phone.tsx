import React, { ReactElement } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import phoneSkins, { PhoneSkinId } from '../data/phoneSkins';

type Props = {
  phoneSkinId: PhoneSkinId;
  expectedOutput: () => ReactElement;
  scale?: number;
};

export default function Phone(props: Props) {
  let { phoneSkinId, expectedOutput, scale = 1 } = props;

  let selectedPhoneSkin = phoneSkins[phoneSkinId];

  return (
    <View>
      <Image
        source={selectedPhoneSkin.source}
        style={{
          width: selectedPhoneSkin.dimension.width * scale,
          height: selectedPhoneSkin.dimension.height * scale,
          resizeMode: 'contain',
        }}
      />
      <View
        style={[
          styles.rendererView,
          {
            top: selectedPhoneSkin.renderArea.offset.top * scale,
            left: selectedPhoneSkin.renderArea.offset.left * scale,
            width: selectedPhoneSkin.renderArea.width * scale,
            height: selectedPhoneSkin.renderArea.height * scale,
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
    backgroundColor: 'white',
  },
});
