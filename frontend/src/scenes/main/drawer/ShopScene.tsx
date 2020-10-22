import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ShopItemList } from '../../../components';
import { LOCALSTORAGE_KEYS } from '../../../constants/keys';
import { ENDPOINT, FIREBASE_URL } from '../../../constants/network';
import { Loading, Switcher } from '../../../core-ui';
import { showModal } from '../../../core-ui/ModalProvider';
import { Content } from '../../../core-ui/Switcher';
import { Avatar } from '../../../data/avatars';
import { PhoneSkin } from '../../../data/phoneSkins';
import shopItems from '../../../data/shop';
import homebrewFetch from '../../../helpers/homebrewFetch';
import { getFromStorage } from '../../../helpers/storage';
import { decodeToken, encodeToken } from '../../../helpers/token';
import { Response } from '../../../types/firestore';

type Props = {
  reduceCurrency: (reduceBy: number) => void;
};

const storeTransactionURL = `${FIREBASE_URL}${ENDPOINT.SHOP_TRANSACTION}`;

export default function ShopScene(props: Props) {
  let { reduceCurrency } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<
    Array<Avatar> | Array<PhoneSkin>
  >(shopItems.avatars);

  const itemTypes: Array<'avatar' | 'phoneSkin'> = ['avatar', 'phoneSkin'];

  const ProcessingModalContent = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
      }}
    >
      <View style={{ marginBottom: 26 }}>
        <Loading />
      </View>
      <Text style={{ fontSize: 16 }}>Processing Transaction...</Text>
    </View>
  );

  const MessageModalContent = (messageModalProps: {
    success: boolean;
    transactionMessage: string;
  }) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
      }}
    >
      <Text style={{ fontSize: 16 }}>
        {messageModalProps.transactionMessage}
      </Text>
    </View>
  );

  let onPurchasePress = (item: Avatar | PhoneSkin) => {
    showModal({
      showCloseButton: false,
      dismissable: false,
      content: ProcessingModalContent,
    });

    const email = decodeToken(getFromStorage(LOCALSTORAGE_KEYS.TOKEN) || '');
    let rawRequestBody = {
      email,
      type: itemTypes[currentIndex],
      id: item.id,
      price: item.price,
    };

    let requestBody = {
      token: encodeToken(rawRequestBody),
    };

    homebrewFetch('POST', storeTransactionURL, requestBody)
      .then((response) => response.json())
      .then((data: Response) => {
        showModal({
          showCloseButton: true,
          dismissable: false,
          content: () => (
            <MessageModalContent
              success={data.success}
              transactionMessage={data.message}
            />
          ),
          onCloseModal: () => {
            if (data.success) {
              reduceCurrency(item.price);
            }
          },
        });
      });
  };

  let ShopContent = () => (
    <View style={styles.shopContentContainer}>
      <ShopItemList
        itemType={itemTypes[currentIndex]}
        items={selectedItems}
        onPurchasePress={onPurchasePress}
      />
    </View>
  );

  let contents: Array<Content> = [
    {
      headerText: 'Avatar',
      component: ShopContent,
    },
    {
      headerText: 'Phone Skin',
      component: ShopContent,
    },
  ];

  let onChangeSwitcher = (newIndex: number) => {
    switch (newIndex) {
      // Avatar
      case 0: {
        setSelectedItems(shopItems.avatars);
        setCurrentIndex(newIndex);
        break;
      }
      // Phone Skin
      case 1: {
        setSelectedItems(shopItems.phoneSkins);
        setCurrentIndex(newIndex);
        break;
      }
      default: {
        setSelectedItems([]);
        setCurrentIndex(0);
        break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Switcher contents={contents} onChangeSwitcher={onChangeSwitcher} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    marginTop: 40,
    backgroundColor: '#fafafa',
  },
  shopContentContainer: {
    flex: 1,
  },
});
