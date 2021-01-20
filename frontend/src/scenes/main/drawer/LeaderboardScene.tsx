import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

import { ENDPOINT, FIREBASE_URL } from '../../../constants/network';
import { Fetcher } from '../../../core-ui';
import { AvatarId } from '../../../data/avatars';
import { UserData } from '../../../fixtures/user';
import { getAvatarSource } from '../../../helpers/avatar';
import homebrewFetch from '../../../helpers/homebrewFetch';
import { decodeToken } from '../../../helpers/token';
import { Response } from '../../../types/firestore';

const getLeaderboardDataURL = `${FIREBASE_URL}${ENDPOINT.GET_GLOBAL_LEADERBOARD}`;

type Props = {};
export default function LeaderboardScene(props: Props) {
  const [leaderboardData, setLeaderboardData] = useState<Array<
    UserData
  > | null>(null);

  useEffect(() => {
    homebrewFetch('POST', getLeaderboardDataURL, null)
      .then((r) => r.json())
      .then((response) => {
        let { token } = response;
        let data = decodeToken(token) as { data: Array<UserData> };
        setLeaderboardData(data.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      {leaderboardData ? (
        leaderboardData.map((data, i) => (
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
                <Text style={styles.username}>{data.username}</Text>
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
