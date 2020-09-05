import { COLORS } from '../constants/styles';

export type UserData = {
  email: string;
  name: string;
  currency: number; // This meant for read-only. Transaction will be checked in backend.
  currentExp: number;
  profilePicBase64: string; // Gatau ini bener apa engga.
  border: string;
};

export const userDataMock: UserData = {
  email: 'andreirawan97@gmail.com',
  name: 'Andre Irawan',
  currency: 1000,
  currentExp: 3045,
  profilePicBase64: '',
  border: COLORS.PASTEL_SALMON,
};

export const emptyUserData: UserData = {
  email: '',
  name: '',
  currency: 0,
  currentExp: 0,
  profilePicBase64: '',
  border: '',
};
