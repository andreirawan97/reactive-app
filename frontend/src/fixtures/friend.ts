import { AvatarId } from '../data/avatars';

type Friend = {
  avatar: AvatarId;
  currentExp: number;
  name: string;
  username: string;
};

export const friendListMock: Array<Friend> = [
  {
    username: 'nolifegaming',
    currentExp: 98321,
    name: 'No Life Gaming',
    avatar: 'fallenCoder',
  },
  {
    username: 'tes',
    currentExp: 0,
    name: 'Tessss',
    avatar: 'noAvatar',
  },
];
