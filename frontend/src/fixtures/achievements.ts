import { AchievementId } from '../data/achievements';

type AchievementData = Record<AchievementId, boolean>;

export type UserAchievements = {
  latestAchievementId: AchievementId | '';
  data: AchievementData;
};
