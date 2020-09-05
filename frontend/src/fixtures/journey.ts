import { StageId } from '../data/journey';

export type LevelsData = {
  levelNo: number;
  unlocked: boolean;
  highScore: number;
};

export type UserJourney = Record<StageId, Array<LevelsData>>;

export const dummyUserJourney: UserJourney = {
  helloWorld: [
    {
      unlocked: true,
      levelNo: 1,
      highScore: 9999,
    },
    {
      unlocked: false,
      levelNo: 2,
      highScore: 9999,
    },
  ],
};
