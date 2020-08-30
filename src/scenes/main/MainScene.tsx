import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Drawer } from '../../components';
import { Content } from '../../components/Drawer';
import { COLORS } from '../../constants/styles';
import { userDataMock } from '../../fixtures/user';
import { NavigationScreenProps } from '../../types/navigation';

import { HomeScene, JourneyScene, ShopScene, LeaderboardScene } from './drawer';

type Props = {} & NavigationScreenProps;
export default function MainScene(props: Props) {
  const [userData, setUserData] = useState(userDataMock);

  useEffect(() => {
    // TODO: Fetch from API and set it.
  }, []);

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

  return (
    <View style={styles.container}>
      <Drawer contents={DRAWER_CONTENTS} userData={userData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
