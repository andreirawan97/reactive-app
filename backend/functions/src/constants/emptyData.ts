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
  ],
};

export const emptyPhoneSkinsData = {
  iphone6: true, // Boolean is the item unlocked. The default is false
};

export const emptyAchievementData = {
  latestAchievementId: "",
  data: {
    helloWorld: false, // Boolean for is the achievement unlocked. The default is false
    aPerspective: false,
  },
};
