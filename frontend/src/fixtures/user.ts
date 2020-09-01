// NOTE: User info bakal di fetch tiap kali di refresh. Ga disimpen di local storage.

import { COLORS } from '../constants/styles';
import { AchievementId } from '../data/achievements';
import { StageId } from '../data/journey';

type JourneyData = {
  id: StageId;
  completedLevel: number;
};

export type UserData = {
  email: string;
  name: string;
  currency: number; // This meant for read-only. Transaction will be checked in backend.
  currentExp: number;
  profilePicBase64: string; // Gatau ini bener apa engga.
  border: string;
  unlockedAchievements: Array<AchievementId>;
  unlockedSkinId: Array<string>;
  phoneSkinId: string;
  journeyData: Array<JourneyData>;
};

export const userDataMock: UserData = {
  email: 'andreirawan97@gmail.com',
  name: 'Andre Irawan',
  currency: 1000,
  currentExp: 3045,
  profilePicBase64: '',
  border: COLORS.PASTEL_SALMON,
  unlockedAchievements: ['helloWorld'],
  unlockedSkinId: ['iphone6'],
  phoneSkinId: 'iphone6',
  journeyData: [
    {
      id: 'helloWorld',
      completedLevel: 1,
    },
  ],
};

export const emptyUserData: UserData = {
  email: '',
  name: '',
  currency: 0,
  currentExp: 0,
  profilePicBase64: '',
  border: '',
  unlockedAchievements: [],
  unlockedSkinId: [],
  phoneSkinId: '',
  journeyData: [
    {
      id: 'helloWorld',
      completedLevel: 1,
    },
  ],
};
