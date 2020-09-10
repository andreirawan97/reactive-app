import { Reward } from '../data/rewards';

export function calculateScore(
  finishedTime: number,
  levelTimeLimit: number,
  difficulty: number,
) {
  return Math.floor(
    ((levelTimeLimit - (levelTimeLimit - finishedTime)) * difficulty) / 1000,
  );
}

export function rollRewards(chanceReward: Reward) {
  const luckyChance = Number(Math.random().toPrecision(2));

  if (chanceReward.chance && luckyChance < chanceReward.chance) {
    return true;
  } else {
    return false;
  }
}
