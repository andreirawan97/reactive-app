import { achievements } from '../data/achievements';

export function getAchievement(id_: string) {
  let result = achievements.filter((achievement) => achievement.id === id_);

  return result[0];
}
