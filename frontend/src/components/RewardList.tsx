import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';

import { Reward } from '../data/rewards';
import { getItemDetail } from '../helpers/item';

type Props = {
  rewards: Array<Reward>;
};

export default function RewardList(props: Props) {
  let { rewards } = props;

  let RewardContent = ({ reward }: { reward: Reward }) => {
    let item = getItemDetail(reward);
    return (
      <View style={styles.rewardContentContainer}>
        <Image
          source={item?.source}
          style={{ width: 45, height: 45, resizeMode: 'contain' }}
        />
        <Text style={styles.rewardContentTitle}>{item?.name}</Text>
        <Text>{reward?.value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.rewardsText}>Reward(s)</Text>
      {rewards.length > 0 ? (
        <ScrollView horizontal={true}>
          {rewards.map((reward, i) => (
            <RewardContent key={i} reward={reward} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noRewardContainer}>
          <Text style={styles.noRewardText}>No Reward</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rewardContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardContentTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  rewardsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  noRewardContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  noRewardText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
  },
});
