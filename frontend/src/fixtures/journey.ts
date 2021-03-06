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
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 2,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 3,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 4,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 5,
      highScore: 0,
      isFirstTime: true,
    },
  ],
  perspective: [
    {
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 2,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 3,
      highScore: 0,
      isFirstTime: true,
    },
  ],
  potrait: [
    {
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 2,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
  ],
  loading: [
    {
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 2,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
  ],
  typeIn: [
    {
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 2,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 3,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 4,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 5,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
  ],
  touchable: [
    {
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 2,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
    {
      levelNo: 3,
      unlocked: false,
      highScore: 0,
      isFirstTime: true,
    },
  ],
};
