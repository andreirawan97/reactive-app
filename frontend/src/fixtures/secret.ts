type UserSecret = {
  email: string;
  password: string;
  salt: number;
};

export let userSecretMock: UserSecret = {
  email: 'andreirawan97@gmail.com',
  password: '81dc9bdb52d04dc20036dbd8313ed055',
  salt: 13,
};
