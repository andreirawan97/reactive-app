import React, { ReactElement } from 'react';

import SVG from '../../assets/svg';

import { helloWorldLevels } from './levels/helloWorld';

export type StageId = 'helloWorld';

export type Code = {
  tabCount: number;
  code: string;
};

export type Level = {
  type: 'fillCode';
  stageName: string;
  levelNo: number;
  content: Array<string>;
  codeContent: Array<Code>;
  correctAnswer: string;
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
    ],
  },
];
