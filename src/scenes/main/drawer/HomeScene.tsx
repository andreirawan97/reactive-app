import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SVG from '../../../../assets/svg';
import { HomeCard } from '../../../components';
import { Button } from '../../../core-ui';
import { userDataMock } from '../../../fixtures/user';
import getAchievement from '../../../helpers/getAchievement';
import { COLORS } from '../../../constants/styles';
import { friendListMock } from '../../../fixtures/friend';

type Props = {};
export default function HomeScene(props: Props) {
  let HomeStart = () =>
    React.createElement(SVG.homeStartSVG, { width: 450, height: 450 });

  let AchievementIcon = () =>
    React.createElement(SVG.achievementSVG, { width: 30, height: 30 });

  let FriendListIcon = () =>
    React.createElement(SVG.friendListSVG, { width: 30, height: 30 });

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
        onPress={() => {}}
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
    useEffect(() => {
      // TODO: Fetch latest achievement
      console.log('Achievement Loaded');
    }, []);

    return (
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
          {getAchievement(userDataMock.latestAchievementId).name}
        </Text>

        <Text
          style={{
            fontSize: 12,
            marginBottom: 24,
          }}
          numberOfLines={1}
        >
          {getAchievement(userDataMock.latestAchievementId).caption}
        </Text>

        <Button
          title="View All"
          onPress={() => {}}
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
          <HomeCard
            title="Achievements"
            titleIcon={AchievementIcon}
            content={
              userDataMock.latestAchievementId
                ? LatestAchievement
                : NoAchievement
            }
          />
        </View>
        <View style={{ flex: 2 }}>
          <HomeCard
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
