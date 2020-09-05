export type AchievementId = 'helloWorld' | 'aPerspective';
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
    id: 'aPerspective',
    name: 'A New Perspective',
    caption: `Complete the "A Perspective" stage`,
  },
];
