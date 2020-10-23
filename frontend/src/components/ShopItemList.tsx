import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { CurrencyIcon } from '../../assets';
import { LOCALSTORAGE_KEYS } from '../constants/keys';
import { ENDPOINT, FIREBASE_URL } from '../constants/network';
import { COLORS } from '../constants/styles';
import { Button, Loading } from '../core-ui';
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
const getUserPhoneSkinsURL = `${FIREBASE_URL}${ENDPOINT.GET_USER_PHONE_SKINS}`;
const requestBody = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };

export default function ShopItemList(props: Props) {
  let { itemType, items, onPurchasePress } = props;

  const [isLoading, setLoading] = useState(true);
  const [userItemData, setUserItemData] = useState<Record<string, boolean>>({
    test: false,
  });

  // Load if the item is owned or not
  useEffect(() => {
    setLoading(true);

    let requestURL = '';
    switch (itemType) {
      case 'avatar': {
        requestURL = getUserAvatarsURL;
        break;
      }
      case 'phoneSkin': {
        requestURL = getUserPhoneSkinsURL;
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
        let userItemDataTmp = decodeToken(token) as Record<string, boolean>;

        setUserItemData(userItemDataTmp);

        setLoading(false);
      });
  }, [itemType]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          {items.map((item, i) => (
            <View key={i} style={styles.shopItemCardContainer}>
              <Image
                source={item.source}
                style={[
                  styles.shopItemImage,
                  {
                    resizeMode: itemType === 'phoneSkin' ? 'contain' : 'cover',
                  },
                ]}
              />
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
                title={userItemData[item.id] ? 'Owned' : 'Purchase'}
                onPress={() => {
                  !userItemData[item.id] && onPurchasePress(item);
                }}
                backgroundColor={
                  userItemData[item.id] ? COLORS.GRAY : COLORS.PRIMARY
                }
                containerStyle={styles.purchaseButtonContainer}
                titleStyle={styles.purchaseButtonText}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 3,
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
