export type AchievementId =
  | 'helloWorld'
  | 'perspective'
  | 'potrait'
  | 'loadingComplete'
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
    id: 'loadingComplete',
    name: 'Loading Complete',
    caption: `Complete the "Loading" stage`,
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
