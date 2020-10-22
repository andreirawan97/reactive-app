import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';

import { COLORS } from '../constants/styles';
import { AvatarId } from '../data/avatars';
import { PhoneSkinId } from '../data/phoneSkins';
import { getAvatarSource } from '../helpers/avatar';

import Phone from './Phone';

type Props =
  | {
      type: 'avatars';
      itemData: Array<AvatarId>;
      onItemChange: (itemId: string) => void;
      initialIndex: number;
    }
  | {
      type: 'phoneSkins';
      itemData: Array<PhoneSkinId>;
      onItemChange: (itemId: string) => void;
      initialIndex: number;
    };

export default function ItemSelection(props: Props) {
  let { type, itemData, onItemChange, initialIndex } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  const onItemPress = (itemId: string, index: number) => {
    setSelectedIndex(index);
    onItemChange(itemId);
  };

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.container}>
      {itemData.map((itemId: string, i: number) =>
        type === 'avatars' ? (
          <Avatar
            key={i}
            rounded
            source={getAvatarSource(itemId as AvatarId)}
            size="large"
            containerStyle={
              selectedIndex === i
                ? styles.selectedContainerAvatar
                : styles.itemContainerAvatar
            }
            onPress={() => onItemPress(itemId, i)}
          />
        ) : type === 'phoneSkins' ? (
          <TouchableOpacity
            style={
              selectedIndex === i
                ? styles.selectedContainerPhone
                : styles.itemContainerPhone
            }
            onPress={() => onItemPress(itemId, i)}
          >
            <Phone
              phoneSkinId={itemId as PhoneSkinId}
              expectedOutput={() => <Text>Hello World!</Text>}
              scale={0.4}
            />
          </TouchableOpacity>
        ) : null,
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainerAvatar: {
    borderColor: 'white',
    borderWidth: 3,
    marginRight: 8,
    padding: 3,
  },
  selectedContainerAvatar: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 3,
    marginRight: 8,
    padding: 3,
  },
  itemContainerPhone: {
    borderColor: 'white',
    borderWidth: 3,
    marginRight: 8,
    borderRadius: 12,
    paddingHorizontal: 6,
  },
  selectedContainerPhone: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 3,
    marginRight: 8,
    borderRadius: 12,
    paddingHorizontal: 6,
  },
});
