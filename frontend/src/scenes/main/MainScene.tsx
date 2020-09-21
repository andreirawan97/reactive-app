import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Drawer } from '../../components';
import { Content } from '../../components/Drawer';
import { COLORS } from '../../constants/styles';
import { NavigationScreenProps } from '../../types/navigation';
import { Fetcher, Loading } from '../../core-ui';
import { emptyUserData, UserData } from '../../fixtures/user';
import { FIREBASE_URL, ENDPOINT } from '../../constants/network';
import { getFromStorage, clearStorage } from '../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../constants/keys';
import { decodeToken } from '../../helpers/token';
import { Response } from '../../types/firestore';

import { HomeScene, JourneyScene, ShopScene, LeaderboardScene } from './drawer';

type Props = {} & NavigationScreenProps;

const URL = `${FIREBASE_URL}${ENDPOINT.GET_USER_DATA}`;
const REQUEST_BODY = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };

export default function MainScene(props: Props) {
  let [userData, setUserData] = useState(emptyUserData);

  let reduceCurrency = (reduceBy: number) => {
    setUserData({
      ...userData,
      currency: userData.currency - reduceBy,
    });
  };

  const DRAWER_CONTENTS: Array<Content> = [
    {
      title: 'Home',
      component: () => HomeScene(props),
      icon: () => (
        <MaterialCommunityIcons
          name="home"
          size={22}
          color={COLORS.PRIMARY_TEXT}
        />
      ),
    },
    {
      title: 'Journey',
      component: () => JourneyScene(props),
      icon: () => (
        <MaterialCommunityIcons
          name="book"
          size={22}
          color={COLORS.PRIMARY_TEXT}
        />
      ),
    },
    {
      title: 'Shop',
      component: () => ShopScene({ ...props, reduceCurrency }),
      icon: () => (
        <MaterialCommunityIcons
          name="shopping"
          size={22}
          color={COLORS.PRIMARY_TEXT}
        />
      ),
    },
    {
      title: 'Leaderboard',
      component: () => LeaderboardScene(props),
      icon: () => (
        <MaterialCommunityIcons
          name="trophy"
          size={22}
          color={COLORS.PRIMARY_TEXT}
        />
      ),
    },
  ];

  let onSuccessFetch = useCallback((response: Response) => {
    let { success } = response;

    if (success) {
      let { token } = response;
      let data = decodeToken(token as string);
      setUserData(data as UserData);
    } else {
      // TODO: show error then,
      clearStorage();
      window.location.reload();
    }
  }, []);

  return (
    <Fetcher
      method="POST"
      URL={URL}
      requestBody={REQUEST_BODY}
      onSuccess={onSuccessFetch}
      fallback={Loading}
    >
      <View style={styles.container}>
        <Drawer contents={DRAWER_CONTENTS} userData={userData} />
      </View>
    </Fetcher>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
