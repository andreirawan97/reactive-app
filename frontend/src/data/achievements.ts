export type AchievementId = 'helloWorld' | 'perspective';
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
];
