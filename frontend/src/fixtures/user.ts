// NOTE: User info bakal di fetch tiap kali di refresh. Ga disimpen di local storage.

import { COLORS } from '../constants/styles';
import { AchievementId } from '../data/achievements';
import { StageId } from '../data/journey';

type JourneyData = {
  id: StageId;
  completedLevel: number;
};

export type UserData = {
  id: string; // ID from firebase
  email: string;
  name: string;
  currency: number; // This meant for read-only. Transaction will be checked in backend.
  currentExp: number;
  profilePicBase64: string; // Gatau ini bener apa engga.
  border: string;
  latestAchievementId: AchievementId;
  phoneSkinId: string;
  completedJourney: Array<JourneyData>;
};

export const userDataMock: UserData = {
  id: 'zxcvbnmn',
  email: 'andreirawan97@gmail.com',
  name: 'Andre Irawan',
  currency: 1000,
  currentExp: 3045,
  profilePicBase64: '',
  border: COLORS.PASTEL_SALMON,
  latestAchievementId: 'helloWorld',
  phoneSkinId: 'iphone6',
  completedJourney: [
    {
      id: 'helloWorld',
      completedLevel: 1,
    },
  ],
};

export const emptyUserData: UserData = {
  id: '',
  email: '',
  name: '',
  currency: 0,
  currentExp: 0,
  profilePicBase64: '',
  border: '',
  latestAchievementId: '',
  phoneSkinId: '',
  completedJourney: [
    {
      id: 'helloWorld',
      completedLevel: 1,
    },
  ],
};
