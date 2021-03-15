import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

import { LOCALSTORAGE_KEYS } from '../../../constants/keys';
import { ENDPOINT, FIREBASE_URL } from '../../../constants/network';
import { Fetcher } from '../../../core-ui';
import Switcher, { Content } from '../../../core-ui/Switcher';
import { UserData } from '../../../fixtures/user';
import { getAvatarSource } from '../../../helpers/avatar';
import { getFromStorage } from '../../../helpers/storage';
import { decodeToken } from '../../../helpers/token';
import { Response } from '../../../types/firestore';

const getLeaderboardDataURL = `${FIREBASE_URL}${ENDPOINT.GET_GLOBAL_LEADERBOARD}`;
const getFriendsLeaderboardURL = `${FIREBASE_URL}${ENDPOINT.GET_FRIENDS_LEADERBOARD}`;
const reqBody = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };

type Props = {};
export default function LeaderboardScene() {
  const [leaderboardGlobalData, setLeaderboardGlobalData] = useState<Array<
    UserData
  > | null>(null);
  const [leaderboardFriendsData, setLeaderboardFriendsData] = useState<Array<
    UserData
  > | null>(null);

  const onSuccessGlobalLeaderboardFetch = useCallback((response: Response) => {
    let { token } = response;
    let data = decodeToken(token) as { data: Array<UserData> };
    setLeaderboardGlobalData(data.data);
  }, []);

  const onSuccessFriendLeaderboardFetch = useCallback((response: Response) => {
    let { token } = response;
    let data = decodeToken(token) as { friendList: Array<UserData> };
    setLeaderboardFriendsData(data.friendList);
  }, []);

  const GlobalContent = () => (
    <Fetcher
      URL={getLeaderboardDataURL}
      method="POST"
      onSuccess={onSuccessGlobalLeaderboardFetch}
      requestBody={reqBody}
    >
      {leaderboardGlobalData ? (
        leaderboardGlobalData.map((data, i) => (
          <View key={i} style={styles.itemContainer}>
            <Text style={styles.rank}>#{i + 1}</Text>
            <View
              style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
            >
              <Avatar
                rounded
                source={getAvatarSource(data.avatar)}
                size="large"
                containerStyle={styles.avatarContainer}
              />

              <View>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.username}>@{data.username}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.exp}>{data.currentExp}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No leaderboard data found. Weird.</Text>
      )}
    </Fetcher>
  );

  const FriendContent = () => (
    <Fetcher
      URL={getFriendsLeaderboardURL}
      method="POST"
      onSuccess={onSuccessFriendLeaderboardFetch}
      requestBody={reqBody}
    >
      {leaderboardFriendsData ? (
        leaderboardFriendsData.map((data, i) => (
          <View key={i} style={styles.itemContainer}>
            <Text style={styles.rank}>#{i + 1}</Text>
            <View
              style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
            >
              <Avatar
                rounded
                source={getAvatarSource(data.avatar)}
                size="large"
                containerStyle={styles.avatarContainer}
              />

              <View>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.username}>@{data.username}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.exp}>{data.currentExp}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>You have no friend :(</Text>
      )}
    </Fetcher>
  );

  let contents: Array<Content> = [
    {
      headerText: 'Global',
      component: GlobalContent,
    },
    {
      headerText: 'Your Friend',
      component: FriendContent,
    },
  ];

  return (
    <View style={styles.container}>
      <Switcher contents={contents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 40,
  },
  itemContainer: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
  },
  exp: {
    fontSize: 22,
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
  },
});
