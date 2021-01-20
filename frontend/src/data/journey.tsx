import React, { ReactElement } from 'react';
import { Image, ImageProps } from 'react-native';
import { JavascriptIcon } from '../../assets';

import SVG from '../../assets/svg';

import { helloWorldLevels } from './levels/helloWorld';
import { perspectiveLevels } from './levels/perspective';
import { Reward } from './rewards';

export type StageId = 'helloWorld' | 'perspective' | 'tutorialJavascript';

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

export type Stage =
  | {
      type: 'challenge';
      id: StageId;
      icon: () => ReactElement;
      name: string;
      levels: Array<Level>;
      description: string;
    }
  | {
      type: 'tutorial';
      id: StageId;
      icon: (iconProps?: Omit<ImageProps, 'source'>) => ReactElement;
      name: string;
      description: string;
    };

export type Section = {
  name: string;
  stages: Array<Stage>;
};

type Journey = Array<Section>;

export const journey: Journey = [
  {
    name: 'Introduction',
    stages: [
      {
        type: 'tutorial',
        id: 'tutorialJavascript',
        icon: (iconProps) => (
          <Image
            source={JavascriptIcon}
            style={{ width: 45, height: 45 }}
            {...iconProps}
          />
        ),
        name: 'JavaScript',
        description: 'Learn the basics of JavaScript!',
      },
    ],
  },
  {
    name: "Beginner's Guide",
    stages: [
      {
        type: 'challenge',
        id: 'helloWorld',
        icon: () =>
          React.createElement(SVG.helloWorldSVG, { width: 50, height: 50 }),
        name: 'Hello World!',
        description:
          'This is the most basic. Learn how to write bug-free Hello World text!',
        levels: helloWorldLevels,
      },
      {
        type: 'challenge',
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
