type Friend = {
  profilePicBase64: string;
  currentExp: number;
  name: string;
  email: string;
};

export const friendListMock: Array<Friend> = [
  {
    email: 'nolifegaming@gmail.com',
    currentExp: 98000,
    name: 'No Life Gaming',
    profilePicBase64: '',
  },
  {
    email: 'tes@gmail.com',
    currentExp: 0,
    name: 'Tessss',
    profilePicBase64: '',
  },
];
