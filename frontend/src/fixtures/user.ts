import { COLORS } from '../constants/styles';
import { AvatarId } from '../data/avatars';

export type UserData = {
  email: string;
  name: string;
  currency: number; // This meant for read-only. Transaction will be checked in backend.
  currentExp: number;
  avatar: AvatarId; // ID dari avatar
  border: string;
};

export const userDataMock: UserData = {
  email: 'andreirawan97@gmail.com',
  name: 'Andre Irawan',
  currency: 1000,
  currentExp: 3045,
  avatar: 'noAvatar',
  border: COLORS.PASTEL_SALMON,
};

export const emptyUserData: UserData = {
  email: '',
  name: '',
  currency: 0,
  currentExp: 0,
  avatar: 'noAvatar',
  border: '',
};
