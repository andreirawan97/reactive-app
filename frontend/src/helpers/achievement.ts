import { achievements } from '../data/achievements';

export function getAchievement(id_: string) {
  let result = achievements.filter((achievement) => achievement.id === id_);
  console.log(id_, result);
  return result[0];
}
