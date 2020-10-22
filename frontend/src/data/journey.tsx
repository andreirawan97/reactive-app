import React, { ReactElement } from 'react';

import SVG from '../../assets/svg';

import { helloWorldLevels } from './levels/helloWorld';
import { perspectiveLevels } from './levels/perspective';
import { Reward } from './rewards';

export type StageId = 'helloWorld' | 'perspective';

export type Code = {
  tabCount: number;
  code: string;
};

export type Level = {
  type: 'fillCode';
  firstTimeRewards: Array<Reward>;
  chanceRewards: Array<Reward>;
  stageName: string;
  levelNo: number;
  content: Array<string>;
  codeContent: Array<Code>;
  correctAnswers: Array<string>;
  expectedOutput: () => ReactElement;
  timeLimit: number; // in milisecond
  difficulty: number; // scale 1-5. Final score (timeLimitMax - currentTimeLimit) / 1000 * difficulty
};

export type Stage = {
  id: StageId;
  icon: () => ReactElement;
  name: string;
  levels: Array<Level>;
  description: string;
};

export type Section = {
  name: string;
  stages: Array<Stage>;
};

type Journey = Array<Section>;

export const journey: Journey = [
  {
    name: "Beginner's Guide",
    stages: [
      {
        id: 'helloWorld',
        icon: () =>
          React.createElement(SVG.helloWorldSVG, { width: 50, height: 50 }),
        name: 'Hello World!',
        description:
          'This is the most basic. Learn how to write bug-free Hello World text!',
        levels: helloWorldLevels,
      },
      {
        id: 'perspective',
        icon: () =>
          React.createElement(SVG.perspectiveSVG, { width: 50, height: 50 }),
        name: 'Perspective',
        description: 'Learn how to build a layout with View component.',
        levels: perspectiveLevels,
      },
    ],
  },
];
