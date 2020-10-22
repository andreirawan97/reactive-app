import { StageId } from '../data/journey';

export type UserLevelData = {
  levelNo: number;
  unlocked: boolean;
  isFirstTime: boolean;
  highScore: number;
};

export type UserJourney = Record<StageId, Array<UserLevelData>>;

export const dummyUserJourney: UserJourney = {
  helloWorld: [
    {
      unlocked: true,
      levelNo: 1,
      isFirstTime: true,
      highScore: 0,
    },
    {
      unlocked: false,
      levelNo: 2,
      isFirstTime: true,
      highScore: 0,
    },
    {
      unlocked: false,
      levelNo: 3,
      isFirstTime: true,
      highScore: 0,
    },
  ],
  perspective: [
    {
      unlocked: true,
      levelNo: 1,
      isFirstTime: true,
      highScore: 0,
    },
  ],
};
