export const emptyJourneyData = {
  helloWorld: [
    {
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 2,
      highScore: 0,
      isFirstTime: true,
    },
    {
      unlocked: false,
      levelNo: 3,
      highScore: 0,
      isFirstTime: true,
    },
  ],
  perspective: [
    {
      levelNo: 1,
      unlocked: true,
      highScore: 0,
      isFirstTime: true,
    },
  ],
};

export const emptyPhoneSkinsData = {
  iphone6: true, // Boolean is the item unlocked. The default is false
  nexus5: false,
};

export const emptyAchievementData = {
  latestAchievementId: "",
  data: {
    helloWorld: false, // Boolean for is the achievement unlocked. The default is false
    perspective: false,
  },
};

export const emptyAvatarData = {
  noAvatar: true,
  fallenCoder: false,
  stickman: false,
  millionaire: false,
  semicolon: false,
  theAtom: false,
};
