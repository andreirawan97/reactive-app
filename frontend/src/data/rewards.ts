export type RewardId = 'currency' | 'exp' | 'avatar' | 'phoneSkin';

export type Reward = {
  id: RewardId;
  value: number | string;
  chance?: number;
};
