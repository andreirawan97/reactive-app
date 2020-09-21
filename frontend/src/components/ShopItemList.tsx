import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { CurrencyIcon } from '../../assets';
import { LOCALSTORAGE_KEYS } from '../constants/keys';
import { ENDPOINT, FIREBASE_URL } from '../constants/network';
import { COLORS } from '../constants/styles';
import { Button, Fetcher, Loading } from '../core-ui';
import { Avatar } from '../data/avatars';
import { PhoneSkin } from '../data/phoneSkins';
import homebrewFetch from '../helpers/homebrewFetch';
import { getFromStorage } from '../helpers/storage';
import { decodeToken } from '../helpers/token';
import { Response } from '../types/firestore';

type Props = {
  itemType: 'avatar' | 'avatarBorder' | 'phoneSkin';
  items: Array<Avatar | PhoneSkin>;
  onPurchasePress: (item: Avatar | PhoneSkin) => void;
};

const getUserAvatarsURL = `${FIREBASE_URL}${ENDPOINT.GET_USER_AVATARS}`;
const requestBody = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };

export default function ShopItemList(props: Props) {
  let { itemType, items, onPurchasePress } = props;

  const [isLoading, setLoading] = useState(true);
  const [userAvatarsData, setUserAvatarsData] = useState<any>();

  let onSuccessFetchData = () => {};

  useEffect(() => {
    setLoading(true);

    let requestURL = '';
    switch (itemType) {
      case 'avatar': {
        requestURL = getUserAvatarsURL;
        break;
      }
      default: {
        requestURL = getUserAvatarsURL;
      }
    }

    homebrewFetch('POST', requestURL, requestBody)
      .then((response) => response.json())
      .then((data: Response) => {
        let { token } = data;
        let userItemData = decodeToken(token);

        if (itemType === 'avatar') {
          setUserAvatarsData(userItemData);
        }

        setLoading(false);
      });
  }, [itemType]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        items.map((item, i) => (
          <View key={i} style={styles.shopItemCardContainer}>
            <Image source={item.source} style={styles.shopItemImage} />
            <Text numberOfLines={1} style={styles.shopItemName}>
              {item.name}
            </Text>

            <View style={styles.currencyContainer}>
              <Image source={CurrencyIcon} style={styles.currencyImage} />
              <Text numberOfLines={1} style={styles.currencyText}>
                {item.price}
              </Text>
            </View>

            <Button
              title={userAvatarsData[item.id] ? 'Owned' : 'Purchase'}
              onPress={() => {
                !userAvatarsData[item.id] && onPurchasePress(item);
              }}
              backgroundColor={
                userAvatarsData[item.id] ? COLORS.GRAY : COLORS.PRIMARY
              }
              containerStyle={styles.purchaseButtonContainer}
              titleStyle={styles.purchaseButtonText}
            />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shopItemCardContainer: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    width: 180,
    height: 250,
    marginRight: 28,
    marginBottom: 40,
    backgroundColor: 'white',
  },
  shopItemImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  shopItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currencyImage: {
    width: 24,
    height: 20,
    marginRight: 6,
  },
  currencyText: {
    fontSize: 14,
  },
  purchaseButtonContainer: {
    position: 'absolute',
    bottom: -18,
    width: 110,
    height: 38,
    borderRadius: 24,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  purchaseButtonText: {
    fontSize: 14,
    color: COLORS.PRIMARY_TEXT,
  },
});
