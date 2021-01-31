import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as jwt from "jsonwebtoken";

import { COLLECTION_NAME } from "./constants/collectionName";
import {
  emptyJourneyData,
  emptyAchievementData,
  emptyPhoneSkinsData,
  emptyAvatarData,
} from "./constants/emptyData";

admin.initializeApp();
const firestore = admin.firestore();

const SECRET_KEY = "hush"; // TODO: Find a better way to store it in production

export const login = functions.https.onRequest(async (req, res) => {
  const { username, password } = JSON.parse(req.body);
  console.log(username, password);

  const secretSnapshot = await firestore
    .collection(COLLECTION_NAME.SECRETS)
    .doc(username)
    .get();

  const secretData = secretSnapshot.data();

  if (secretData && password === secretData.password) {
    const userSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(username)
      .get();

    // userData always return something.
    const userData = userSnapshot.data() || {};

    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK",
      token: jwt.sign(userData.username, SECRET_KEY),
    });
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Username or password incorrect!",
      token: "",
    });
  }
});

export const signup = functions.https.onRequest(async (req, res) => {
  const emptyUserData = {
    username: "",
    name: "",
    currency: 0,
    currentExp: 0,
    avatar: "noAvatar",
    phoneSkin: "iphone6",
  };
  const emptyFriendList = {
    friendList: [],
  };

  const { username, password, name } = JSON.parse(req.body);

  const userSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(username)
    .get();

  const userData = userSnapshot.data();

  if (userData) {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Account already exist!",
      token: "",
    });
  } else {
    await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(username)
      .set({
        ...emptyUserData,
        username,
        name,
      });

    await firestore.collection(COLLECTION_NAME.SECRETS).doc(username).set({
      username,
      password,
    });

    await firestore
      .collection(COLLECTION_NAME.ACHIEVEMENTS)
      .doc(username)
      .set(emptyAchievementData);

    await firestore
      .collection(COLLECTION_NAME.FRIENDS)
      .doc(username)
      .set(emptyFriendList);

    await firestore
      .collection(COLLECTION_NAME.PHONE_SKINS)
      .doc(username)
      .set(emptyPhoneSkinsData);

    await firestore
      .collection(COLLECTION_NAME.JOURNEY)
      .doc(username)
      .set(emptyJourneyData);

    await firestore
      .collection(COLLECTION_NAME.AVATARS)
      .doc(username)
      .set(emptyAvatarData);

    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK",
      token: jwt.sign(username, SECRET_KEY),
    });
  }
});

export const getUserData = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);

  try {
    let username = jwt.verify(token, SECRET_KEY) as string;

    const userSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(username)
      .get();

    const userData = userSnapshot.data();

    if (userData) {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: true,
        message: "OK",
        token: jwt.sign(userData, SECRET_KEY),
      });
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: false,
        message: "Error occured. Please check if you have a correct key!",
        token: "",
      });
    }
  } catch {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Error occured. Please check if you have a correct key!",
      token: "",
    });
  }
});

export const getUserAchievements = functions.https.onRequest(
  async (req, res) => {
    let { token } = JSON.parse(req.body);
    let username = jwt.verify(token, SECRET_KEY) as string;

    const achievementsSnapshot = await firestore
      .collection(COLLECTION_NAME.ACHIEVEMENTS)
      .doc(username)
      .get();

    const achievementsData = achievementsSnapshot.data();

    if (achievementsData) {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: true,
        message: "OK.",
        token: jwt.sign(achievementsData, SECRET_KEY),
      });
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: false,
        message: "Error occured when loading Achievements",
        token: "",
      });
    }
  }
);

export const getUserJourney = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let username = jwt.verify(token, SECRET_KEY) as string;

  const journeySnapshot = await firestore
    .collection(COLLECTION_NAME.JOURNEY)
    .doc(username)
    .get();

  const journeyData = journeySnapshot.data();

  if (journeyData) {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK.",
      token: jwt.sign(journeyData, SECRET_KEY),
    });
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Error occured when loading Achievements",
      token: "",
    });
  }
});

export const getUserAvatars = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let username = jwt.verify(token, SECRET_KEY) as string;

  const avatarsSnapshot = await firestore
    .collection(COLLECTION_NAME.AVATARS)
    .doc(username)
    .get();

  const avatarsData = avatarsSnapshot.data();

  if (avatarsData) {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK.",
      token: jwt.sign(avatarsData, SECRET_KEY),
    });
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Error occured when loading Achievements",
      token: "",
    });
  }
});

export const getUserPhoneSkins = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let username = jwt.verify(token, SECRET_KEY) as string;

  const phoneSkinsSnapshot = await firestore
    .collection(COLLECTION_NAME.PHONE_SKINS)
    .doc(username)
    .get();

  const phoneSkinsData = phoneSkinsSnapshot.data();

  if (phoneSkinsData) {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK.",
      token: jwt.sign(phoneSkinsData, SECRET_KEY),
    });
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Error occured when loading Achievements",
      token: "",
    });
  }
});

export const updateJourneyProgress = functions.https.onRequest(
  async (req, res) => {
    let { token } = JSON.parse(req.body);

    let { username, id, levelNo, score, rewards } = jwt.verify(
      token,
      SECRET_KEY
    ) as {
      username: string;
      id: string;
      levelNo: number;
      score: number;
      rewards: Array<any>;
    };

    const journeySnapshot = await firestore
      .collection(COLLECTION_NAME.JOURNEY)
      .doc(username)
      .get();
    const userSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(username)
      .get();
    const achievementSnapshot = await firestore
      .collection(COLLECTION_NAME.ACHIEVEMENTS)
      .doc(username)
      .get();

    const journeyData = journeySnapshot.data();
    const userData = userSnapshot.data();
    const achievementData = achievementSnapshot.data();

    if (journeyData && userData && achievementData) {
      journeyData[id][levelNo - 1].highScore =
        score > journeyData[id][levelNo - 1].highScore
          ? score
          : journeyData[id][levelNo - 1].highScore;
      journeyData[id][levelNo - 1].isFirstTime = false;

      if (journeyData[id][levelNo]) {
        journeyData[id][levelNo].unlocked = true;
      }

      // If there is no next level, update the achievement
      if (!journeyData[id][levelNo]) {
        achievementData.data[id] = true;
        achievementData.latestAchievementId = id;
      }

      rewards.forEach((reward) => {
        switch (reward.id) {
          case "exp": {
            userData.currentExp += reward.value;
            break;
          }
          case "currency": {
            userData.currency += reward.value;
            break;
          }
          default: {
            break;
          }
        }
      });

      await firestore
        .collection(COLLECTION_NAME.JOURNEY)
        .doc(username)
        .set(journeyData);

      await firestore
        .collection(COLLECTION_NAME.USERS)
        .doc(username)
        .set(userData);

      await firestore
        .collection(COLLECTION_NAME.ACHIEVEMENTS)
        .doc(username)
        .set(achievementData);

      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: true,
        message: "OK.",
        token: "",
      });
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: false,
        message: "Error occured. No user found!",
        token: "",
      });
    }
  }
);

export const shopTransaction = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let { type, id, price, username } = jwt.verify(token, SECRET_KEY) as {
    username: string;
    type: string;
    id: string;
    price: number;
  };

  const userSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(username)
    .get();

  const userData = userSnapshot.data();

  if (userData) {
    if (userData.currency >= price) {
      switch (type) {
        case "avatar": {
          const avatarSnapshot = await firestore
            .collection(COLLECTION_NAME.AVATARS)
            .doc(username)
            .get();
          const avatarData = avatarSnapshot.data();

          if (avatarData && !avatarData[id]) {
            userData.currency -= price;
            avatarData[id] = true;

            await firestore
              .collection(COLLECTION_NAME.AVATARS)
              .doc(username)
              .set(avatarData);

            await firestore
              .collection(COLLECTION_NAME.USERS)
              .doc(username)
              .set(userData);

            res.set({ "Access-Control-Allow-Origin": "*" });
            res.send({
              success: true,
              message: "Item successfully purchased!",
              token: "",
            });
          } else {
            res.set({ "Access-Control-Allow-Origin": "*" });
            res.send({
              success: false,
              message: "You already have this item!",
              token: "",
            });
          }
          break;
        }
        case "phoneSkin": {
          const phoneSkinSnapshot = await firestore
            .collection(COLLECTION_NAME.PHONE_SKINS)
            .doc(username)
            .get();
          const phoneSkinData = phoneSkinSnapshot.data();

          if (phoneSkinData && !phoneSkinData[id]) {
            userData.currency -= price;
            phoneSkinData[id] = true;

            await firestore
              .collection(COLLECTION_NAME.PHONE_SKINS)
              .doc(username)
              .set(phoneSkinData);

            await firestore
              .collection(COLLECTION_NAME.USERS)
              .doc(username)
              .set(userData);

            res.set({ "Access-Control-Allow-Origin": "*" });
            res.send({
              success: true,
              message: "Item successfully purchased!",
              token: "",
            });
          } else {
            res.set({ "Access-Control-Allow-Origin": "*" });
            res.send({
              success: false,
              message: "You already have this item!",
              token: "",
            });
          }
          break;
        }
        default: {
          res.set({ "Access-Control-Allow-Origin": "*" });
          res.send({
            success: false,
            message: "Error occured. ",
            token: "Error occured. Invalid item type",
          });
          break;
        }
      }
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: false,
        message: "You have not enough Coffe Beans!",
        token: "",
      });
    }
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Error occured. Cannot process transaction",
      token: "",
    });
  }
});

export const updateUserProfile = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let { username, phoneSkin, avatar } = jwt.verify(token, SECRET_KEY) as {
    username: string;
    phoneSkin: string;
    avatar: string;
  };

  const userSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(username)
    .get();
  const userData = userSnapshot.data();

  if (userData) {
    userData.phoneSkin = phoneSkin;
    userData.avatar = avatar;

    await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(username)
      .set(userData);

    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "Profile saved!",
      token: "",
    });
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Error occured. User not found!",
      token: "",
    });
  }
});

export const getCustomizationItem = functions.https.onRequest(
  async (req, res) => {
    let { token } = JSON.parse(req.body);
    let username = jwt.verify(token, SECRET_KEY) as string;

    const avatarsSnapshot = await firestore
      .collection(COLLECTION_NAME.AVATARS)
      .doc(username)
      .get();
    const phoneSkinsSnapshot = await firestore
      .collection(COLLECTION_NAME.PHONE_SKINS)
      .doc(username)
      .get();

    const avatarsData = avatarsSnapshot.data();
    const phoneSkinsData = phoneSkinsSnapshot.data();

    if (avatarsData && phoneSkinsData) {
      let ownedAvatars: Array<string> = [];
      Object.keys(avatarsData).forEach((avatarId) => {
        if (avatarsData[avatarId]) {
          ownedAvatars.push(avatarId);
        }
      });

      let ownedPhoneSkins: Array<string> = [];
      Object.keys(phoneSkinsData).forEach((phoneSkinId) => {
        if (phoneSkinsData[phoneSkinId]) {
          ownedPhoneSkins.push(phoneSkinId);
        }
      });

      let response = {
        avatars: ownedAvatars,
        phoneSkins: ownedPhoneSkins,
      };

      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: true,
        message: "OK.",
        token: jwt.sign(response, SECRET_KEY),
      });
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: false,
        message: "Error occured! No data found",
        token: "",
      });
    }
  }
);

export const getGlobalLeaderboard = functions.https.onRequest(
  async (req, res) => {
    let globalLeaderboardData: Array<Object> = [];

    const globalLeaderboardSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .orderBy("currentExp", "desc")
      .limit(10)
      .get();

    globalLeaderboardSnapshot.forEach((item) => {
      globalLeaderboardData.push(item.data());
    });

    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK.",
      token: jwt.sign({ data: globalLeaderboardData }, SECRET_KEY),
    });
  }
);

export const getFriendsLeaderboard = functions.https.onRequest(
  async (req, res) => {
    let { token } = JSON.parse(req.body);
    let username = jwt.verify(token, SECRET_KEY) as string;

    const userSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(username)
      .get();

    const userData = userSnapshot.data();

    const friendsSnapshot = await firestore
      .collection(COLLECTION_NAME.FRIENDS)
      .doc(username)
      .get();

    const friendsData = friendsSnapshot.data();

    if (userData && friendsData) {
      let promises: Array<Promise<unknown>> = [];

      let friendList: Array<any> = [userData];

      friendsData.friendList.forEach((friendUsername: string) => {
        promises.push(
          firestore
            .collection(COLLECTION_NAME.USERS)
            .doc(friendUsername)
            .get()
            .then((data) => {
              friendList.push(data.data());
            })
        );
      });

      Promise.all(promises)
        .then(() => {
          friendList.sort((friend1, friend2) => {
            return friend2.currentExp - friend1.currentExp;
          });

          res.set({ "Access-Control-Allow-Origin": "*" });
          res.send({
            success: true,
            message: "",
            token: jwt.sign({ friendList }, SECRET_KEY),
          });
        })
        .catch(() => {
          res.set({ "Access-Control-Allow-Origin": "*" });
          res.send({
            success: false,
            message: "Error in promise",
            token: "",
          });
        });
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: false,
        message: "You have no friend!",
        token: "",
      });
    }
  }
);

export const getUserFriends = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let username = jwt.verify(token, SECRET_KEY) as string;

  const friendsSnapshot = await firestore
    .collection(COLLECTION_NAME.FRIENDS)
    .doc(username)
    .get();

  const friendsData = friendsSnapshot.data();

  if (friendsData) {
    let promises: Array<Promise<unknown>> = [];

    let friendList: Array<any> = [];

    friendsData.friendList.forEach((friendUsername: string) => {
      promises.push(
        firestore
          .collection(COLLECTION_NAME.USERS)
          .doc(friendUsername)
          .get()
          .then((data) => {
            friendList.push(data.data());
          })
      );
    });

    Promise.all(promises)
      .then(() => {
        res.set({ "Access-Control-Allow-Origin": "*" });
        res.send({
          success: true,
          message: "",
          token: jwt.sign({ friendList }, SECRET_KEY),
        });
      })
      .catch(() => {
        res.set({ "Access-Control-Allow-Origin": "*" });
        res.send({
          success: false,
          message: "Error in promise",
          token: "",
        });
      });
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "You have no friend!",
      token: "",
    });
  }
});

export const addFriend = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let { username, friendUsername } = jwt.verify(token, SECRET_KEY) as {
    username: string;
    friendUsername: string;
  };

  const friendSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(friendUsername)
    .get();

  const friendData = friendSnapshot.data();

  if (username !== friendUsername) {
    if (friendData) {
      const friendsDataSnapshot = await firestore
        .collection(COLLECTION_NAME.FRIENDS)
        .doc(username)
        .get();

      const friendsData = friendsDataSnapshot.data() as {
        friendList: Array<string>;
      };

      if (friendsData) {
        if (!friendsData.friendList.includes(friendUsername)) {
          const friendFriendsDataSnapshot = await firestore
            .collection(COLLECTION_NAME.FRIENDS)
            .doc(friendUsername)
            .get();

          const friendFriendsData = friendFriendsDataSnapshot.data() as {
            friendList: Array<string>;
          };

          friendFriendsData.friendList.push(username);

          friendsData.friendList.push(friendUsername);

          await firestore
            .collection(COLLECTION_NAME.FRIENDS)
            .doc(username)
            .set(friendsData);

          await firestore
            .collection(COLLECTION_NAME.FRIENDS)
            .doc(friendUsername)
            .set(friendFriendsData);

          res.set({ "Access-Control-Allow-Origin": "*" });
          res.send({
            success: true,
            message: "Friend's added successfully.",
            token: jwt.sign(friendsData, SECRET_KEY),
          });
        } else {
          res.set({ "Access-Control-Allow-Origin": "*" });
          res.send({
            success: false,
            message: "Your already add this friend.",
            token: "",
          });
        }
      } else {
        res.set({ "Access-Control-Allow-Origin": "*" });
        res.send({
          success: false,
          message: "Error occured",
          token: "",
        });
      }
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" });
      res.send({
        success: false,
        message: "Your friend's username is not found.",
        token: "",
      });
    }
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Your cannot add yourself. Lol.",
      token: "",
    });
  }
});

export const deleteFriend = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);
  let { username, friendUsername } = jwt.verify(token, SECRET_KEY) as {
    username: string;
    friendUsername: string;
  };

  const friendsDataSnapshot = await firestore
    .collection(COLLECTION_NAME.FRIENDS)
    .doc(username)
    .get();

  const friendFriendsDataSnapshot = await firestore
    .collection(COLLECTION_NAME.FRIENDS)
    .doc(friendUsername)
    .get();

  const friendsData = friendsDataSnapshot.data() as {
    friendList: Array<string>;
  };

  const friendFriendsData = friendFriendsDataSnapshot.data() as {
    friendList: Array<string>;
  };

  const newFriendsData = friendsData.friendList.filter(
    (friend) => friend !== friendUsername
  );

  const newFriendFriendsData = friendFriendsData.friendList.filter(
    (friend) => friend !== username
  );

  await firestore
    .collection(COLLECTION_NAME.FRIENDS)
    .doc(username)
    .set({ friendList: newFriendsData });

  await firestore
    .collection(COLLECTION_NAME.FRIENDS)
    .doc(friendUsername)
    .set({ friendList: newFriendFriendsData });

  res.set({ "Access-Control-Allow-Origin": "*" });
  res.send({
    success: true,
    message: "Removed friend success.",
    token: "",
  });
});
