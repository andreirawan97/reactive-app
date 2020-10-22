import { COLORS } from '../constants/styles';
import { AvatarId } from '../data/avatars';
import { PhoneSkinId } from '../data/phoneSkins';

export type UserData = {
  email: string;
  name: string;
  currency: number; // This meant for read-only. Transaction will be checked in backend.
  currentExp: number;
  avatar: AvatarId; // ID dari avatar
  border: string;
  phoneSkin: string;
};

export const userDataMock: UserData = {
  email: 'andreirawan97@gmail.com',
  name: 'Andre Irawan',
  currency: 1000,
  currentExp: 3045,
  avatar: 'noAvatar',
  border: COLORS.PASTEL_SALMON,
  phoneSkin: 'nexus5',
};

export const emptyUserData: UserData = {
  email: '',
  name: '',
  currency: 0,
  currentExp: 0,
  avatar: 'noAvatar',
  border: '',
  phoneSkin: 'iphone6',
};

export const emptyUserAvatarsData: Record<AvatarId, boolean> = {
  noAvatar: true,
  fallenCoder: false,
  stickman: false,
  millionaire: false,
  semicolon: false,
  theAtom: false,
};

export const emptyUserPhoneSkinsData: Record<PhoneSkinId, boolean> = {
  iphone6: true, // Boolean is the item unlocked. The default is false
  nexus5: false,
};
