export type AchievementId =
  | 'helloWorld'
  | 'perspective'
  | 'potrait'
  | 'loading'
  | 'typeIn'
  | 'touchable'
  | 'beffJezos'
  | 'morningstar';

type Achievement = {
  id: AchievementId;
  name: string;
  caption: string;
};

export const achievements: Array<Achievement> = [
  {
    id: 'helloWorld',
    name: 'Hello World!',
    caption: `Complete the "Hello World!" stage`,
  },
  {
    id: 'perspective',
    name: 'A New Perspective',
    caption: `Complete the "Perspective" stage`,
  },
  {
    id: 'potrait',
    name: 'Picasso',
    caption: `Complete the "Portrait" stage`,
  },
  {
    id: 'loading',
    name: 'Loading Complete',
    caption: `Complete the "Loading" stage`,
  },
  {
    id: 'typeIn',
    name: 'Type Out',
    caption: `Complete the "Type Out" stage`,
  },
  {
    id: 'touchable',
    name: 'Touchabled',
    caption: `Complete the "Touchable" stage`,
  },
  {
    id: 'morningstar',
    name: 'Morningstar',
    caption: 'Get Fallen Coder avatar',
  },
  {
    id: 'beffJezos',
    name: 'Beff Jezos',
    caption: 'Get Millionaire avatar',
  },
];
