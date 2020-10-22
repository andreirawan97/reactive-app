import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SVG from '../../../../assets/svg';
import { Card } from '../../../components';
import { Button, Fetcher } from '../../../core-ui';
import { getAchievement } from '../../../helpers/achievement';
import { COLORS } from '../../../constants/styles';
import { friendListMock } from '../../../fixtures/friend';
import { NavigationScreenProps } from '../../../types/navigation';
import { getFromStorage } from '../../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../../constants/keys';
import { FIREBASE_URL, ENDPOINT } from '../../../constants/network';
import { decodeToken } from '../../../helpers/token';
import { Response } from '../../../types/firestore';
import { UserAchievements } from '../../../fixtures/achievements';
import { showModal } from '../../../core-ui/ModalProvider';
import { achievements } from '../../../data/achievements';

const tokenReqBody = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };

const getUserAchievementsURL = `${FIREBASE_URL}${ENDPOINT.GET_USER_ACHIEVEMENTS}`;

type Props = {} & NavigationScreenProps;

export default function HomeScene(props: Props) {
  const [userAchievements, setUserAchievements] = useState<UserAchievements>({
    latestAchievementId: '',
    data: {
      helloWorld: false, // Boolean for is the achievement unlocked. The default is false
      perspective: false,
    },
  });

  let onSuccessGetUserAchievements = useCallback((response: Response) => {
    let { token } = response;
    let data = decodeToken(token) as UserAchievements;
    setUserAchievements(data);
  }, []);

  let HomeStart = () =>
    React.createElement(SVG.homeStartSVG, { width: 450, height: 450 });
  let AchievementIcon = () =>
    React.createElement(SVG.achievementSVG, { width: 30, height: 30 });
  let FriendListIcon = () =>
    React.createElement(SVG.friendListSVG, { width: 30, height: 30 });
  let LockIcon = () =>
    React.createElement(SVG.lockSVG, {
      width: 50,
      height: 50,
      fill: '#898989',
    });
  let GreenCheckmarkIcon = () =>
    React.createElement(SVG.greenCheckmarkSVG, { width: 50, height: 50 });

  let AchievementModalContent = () => {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {achievements.map((achievement, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              paddingTop: 24,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}
              >
                {achievement.name}
              </Text>
              <Text style={{ fontSize: 14 }}>{achievement.caption}</Text>
            </View>

            {userAchievements.data[achievement.id] ? (
              <GreenCheckmarkIcon />
            ) : (
              <LockIcon />
            )}
          </View>
        ))}
      </ScrollView>
    );
  };

  let viewAllAchievements = () => {
    showModal({
      content: AchievementModalContent,
      title: 'Achievements',
      containerStyle: {
        width: '60%',
      },
    });
  };

  let NoAchievement = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{ fontSize: 14, color: 'rgba(0,0,0, 0.45)', marginVertical: 32 }}
      >
        No Achievement
      </Text>

      <Button
        title="View All"
        onPress={viewAllAchievements}
        containerStyle={{
          borderRadius: 21,
          height: 42,
          width: '50%',
        }}
        titleStyle={{
          fontSize: 12,
        }}
      />
    </View>
  );

  let NoFriend = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{ fontSize: 14, color: 'rgba(0,0,0, 0.45)', marginVertical: 32 }}
      >
        You Have No Friend :(
      </Text>
    </View>
  );

  let LatestAchievement = () => {
    return (
      <Fetcher
        method="POST"
        URL={getUserAchievementsURL}
        requestBody={tokenReqBody}
        onSuccess={onSuccessGetUserAchievements}
      >
        {userAchievements?.latestAchievementId === '' ? (
          <NoAchievement />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginVertical: 12,
              }}
              numberOfLines={1}
            >
              {getAchievement(userAchievements.latestAchievementId).name}
            </Text>

            <Text
              style={{
                fontSize: 12,
                marginBottom: 24,
              }}
              numberOfLines={1}
            >
              {getAchievement(userAchievements.latestAchievementId).caption}
            </Text>

            <Button
              title="View All"
              onPress={viewAllAchievements}
              containerStyle={{
                borderRadius: 21,
                height: 42,
                width: '50%',
              }}
              titleStyle={{
                fontSize: 12,
              }}
            />
          </View>
        )}
      </Fetcher>
    );
  };

  let FriendList = () => {
    // TODO: Fetch friend list
    return (
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {friendListMock.length ? (
          friendListMock.map((friend, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}
                  numberOfLines={1}
                >
                  {friend.name}
                </Text>
                <Text style={{ fontSize: 12 }}>Level 99</Text>
              </View>

              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="account-remove"
                  color={COLORS.PASTEL_SALMON}
                  onPress={() => {}}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <NoFriend />
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <HomeStart />
        <Text style={styles.headerText}>Start Your Journey Now</Text>
        <Text style={styles.captionText}>
          Let&apos;s start your Reactive journey and become the master of React
          Native!
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={{ flex: 1, marginBottom: 20 }}>
          <Card
            title="Achievements"
            titleIcon={AchievementIcon}
            content={LatestAchievement}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Card
            title="Friend List"
            titleIcon={FriendListIcon}
            content={FriendList}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
  },
  homeContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 0.8,
    paddingVertical: 20,
    paddingRight: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  captionText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    width: 390,
    textAlign: 'center',
  },
});
