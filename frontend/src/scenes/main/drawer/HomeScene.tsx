import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

import SVG from '../../../../assets/svg';
import { Card } from '../../../components';
import { Button, Fetcher, Loading, TextInput } from '../../../core-ui';
import { getAchievement } from '../../../helpers/achievement';
import { COLORS } from '../../../constants/styles';
import { Friend } from '../../../fixtures/friend';
import { NavigationScreenProps } from '../../../types/navigation';
import { getFromStorage } from '../../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../../constants/keys';
import { FIREBASE_URL, ENDPOINT } from '../../../constants/network';
import { decodeToken, encodeToken } from '../../../helpers/token';
import { Response } from '../../../types/firestore';
import { UserAchievements } from '../../../fixtures/achievements';
import { showModal } from '../../../core-ui/ModalProvider';
import { achievements } from '../../../data/achievements';
import { getAvatarSource } from '../../../helpers/avatar';
import homebrewFetch from '../../../helpers/homebrewFetch';

const tokenReqBody = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };

const getUserAchievementsURL = `${FIREBASE_URL}${ENDPOINT.GET_USER_ACHIEVEMENTS}`;
const getFriendsURL = `${FIREBASE_URL}${ENDPOINT.GET_USER_FRIENDS}`;
const addFriendURL = `${FIREBASE_URL}${ENDPOINT.ADD_FRIEND}`;
const deleteFriendURL = `${FIREBASE_URL}${ENDPOINT.DELETE_FRIEND}`;
const rickRolledURL = `${FIREBASE_URL}${ENDPOINT.RICK_ROLLED}`;

type Props = {} & NavigationScreenProps;

export default function HomeScene() {
  const [userAchievements, setUserAchievements] = useState<UserAchievements>({
    latestAchievementId: '',
    data: {
      helloWorld: false, // Boolean for is the achievement unlocked. The default is false
      perspective: false,
      potrait: false,
      loading: false,
      morningstar: false,
      beffJezos: false,
      touchable: false,
      typeIn: false,
      rickRolled: false,
    },
  });
  const [friendList, setFriendList] = useState<Array<Friend>>([]);
  const [friendUsername, setFriendUsername] = useState('');
  const [egg, setEgg] = useState(0);

  useEffect(() => {
    if (egg === 10) {
      homebrewFetch('POST', rickRolledURL, tokenReqBody)
        .then((response) => response.json())
        .then(() => {
          location.reload();
        });
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }
  }, [egg]);

  let onSuccessGetUserAchievements = useCallback((response: Response) => {
    let { token } = response;
    let data = decodeToken(token) as UserAchievements;
    setUserAchievements(data);
  }, []);

  let onSuccessGetFriendList = useCallback((response: Response) => {
    let { token } = response;
    let data = decodeToken(token) as {
      friendList: Array<Friend>;
    };
    if (data.friendList.length > 0) {
      setFriendList(data.friendList);
    }
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
      <View style={{ flex: 1 }}>
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
      </View>
    );
  };

  const LoadingAddFriendModalContent = () => (
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
      <Text style={{ fontSize: 16 }}>Adding Friend...</Text>
    </View>
  );

  let viewAllAchievements = () => {
    showModal({
      content: AchievementModalContent,
      title: 'Achievements',
      containerStyle: {
        width: '60%',
      },
    });
  };

  let showAddFriendResult = (data: Response) => {
    let { message, success, token } = data;

    let GreenCheckmarkIcon = () =>
      React.createElement(SVG.greenCheckmarkSVG, {
        width: 90,
        height: 90,
      });
    let RedCrossmarkIcon = () =>
      React.createElement(SVG.redCrossmarkSVG, {
        width: 90,
        height: 90,
      });

    showModal({
      content: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ marginBottom: 48 }}>
            {success ? <GreenCheckmarkIcon /> : <RedCrossmarkIcon />}
          </View>
          <Text style={{ fontSize: 16 }}>{message}</Text>
        </View>
      ),
      containerStyle: {
        width: '60%',
      },
      contentContainerStyle: {
        paddingVertical: 20,
      },
      onCloseModal: () => {
        if (token) {
          window.location.reload();
        }
      },
    });
  };

  let showLoadingAddFriend = () => {
    showModal({
      showCloseButton: false,
      dismissable: false,
      content: LoadingAddFriendModalContent,
    });
  };

  let addFriend = () => {
    showLoadingAddFriend();

    if (friendUsername) {
      const username = decodeToken(
        getFromStorage(LOCALSTORAGE_KEYS.TOKEN) || '',
      );
      let rawRequestBody = {
        username,
        friendUsername,
      };
      let requestBody = {
        token: encodeToken(rawRequestBody),
      };

      homebrewFetch('POST', addFriendURL, requestBody)
        .then((response) => response.json())
        .then((data: Response) => {
          showAddFriendResult(data);
        });
    } else {
      showAddFriendResult({
        message: "Friend's username cannot be empty!",
        success: false,
        token: '',
      });
    }
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
    return (
      <Fetcher
        method="POST"
        URL={getFriendsURL}
        requestBody={tokenReqBody}
        onSuccess={onSuccessGetFriendList}
      >
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 8,
            paddingHorizontal: 4,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <TextInput
              style={{ fontSize: 14 }}
              placeholder="Input friend username..."
              onChangeText={setFriendUsername}
              value={friendUsername}
              containerStyle={{
                paddingVertical: 4,
                paddingHorizontal: 4,
                borderRadius: 8,
                flex: 1,
              }}
            />

            <TouchableOpacity style={{ marginLeft: 8 }} onPress={addFriend}>
              <Text
                style={{
                  color: COLORS.PRIMARY,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>

          {friendList ? (
            friendList.map((friend, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    rounded
                    source={getAvatarSource(friend.avatar)}
                    size="small"
                    containerStyle={{
                      marginRight: 8,
                    }}
                  />

                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}
                        numberOfLines={1}
                      >
                        {friend.name}
                      </Text>
                      <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)' }}>
                        (@{friend.username})
                      </Text>
                    </View>

                    <Text style={{ fontSize: 12 }}>
                      Level {Math.floor(friend.currentExp / 1000) + 1}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="account-remove"
                    color={COLORS.PASTEL_SALMON}
                    onPress={() => {
                      const newFriendList = friendList.filter(
                        (friend_) => friend.username !== friend_.username,
                      );
                      setFriendList(newFriendList);

                      const username = decodeToken(
                        getFromStorage(LOCALSTORAGE_KEYS.TOKEN) || '',
                      );
                      let rawRequestBody = {
                        username,
                        friendUsername: friend.username,
                      };
                      let requestBody = {
                        token: encodeToken(rawRequestBody),
                      };

                      homebrewFetch('POST', deleteFriendURL, requestBody)
                        .then((response) => response.json())
                        .then(() => {});
                    }}
                    size={28}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <NoFriend />
          )}
        </ScrollView>
      </Fetcher>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        <HomeStart />
        <Text style={styles.headerText}>Start Your Journey Now</Text>
        <Text style={styles.captionText}>
          Let&apos;s start your Reactive journey and become the{' '}
          <Text
            onPress={() => {
              setEgg(egg + 1);
            }}
          >
            master
          </Text>{' '}
          of React Native!
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
