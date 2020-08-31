import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { Drawer } from '../../components';
import { Content } from '../../components/Drawer';
import { COLORS } from '../../constants/styles';
import { NavigationScreenProps } from '../../types/navigation';
import { Fetcher, Loading } from '../../core-ui';
import { emptyUserData, UserData } from '../../fixtures/user';
import { firebase } from '../../firebase/config';

import { HomeScene, JourneyScene, ShopScene, LeaderboardScene } from './drawer';

type Props = {} & NavigationScreenProps;

export default function MainScene(props: Props) {
  let [userData, setUserData] = useState(emptyUserData);

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
      component: () => ShopScene(props),
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

  useFocusEffect(() => {
    // Re-fetch when focus and re-focus
    console.log('focused');
    firebase.analytics();
  });

  let onSuccessFetch = (data: Record<string, unknown>) => {
    setUserData(data as UserData);
  };

  return (
    <Fetcher url="" onSuccess={onSuccessFetch} fallback={Loading}>
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
