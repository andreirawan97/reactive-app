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
  const { email, password } = JSON.parse(req.body);

  const secretSnapshot = await firestore
    .collection(COLLECTION_NAME.SECRETS)
    .doc(email)
    .get();

  const secretData = secretSnapshot.data();

  if (secretData && password === secretData.password) {
    const userSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(email)
      .get();

    // userData always return something.
    const userData = userSnapshot.data() || {};

    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK",
      token: jwt.sign(userData.email, SECRET_KEY),
    });
  } else {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: false,
      message: "Email or password incorrect!",
      token: "",
    });
  }
});

export const signup = functions.https.onRequest(async (req, res) => {
  const emptyUserData = {
    email: "",
    name: "",
    currency: 0,
    currentExp: 0,
    avatar: "noAvatar",
    phoneSkin: "iphone6",
  };
  const emptyFriendList = {
    friendList: [],
  };

  const { email, password, name } = JSON.parse(req.body);

  const userSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(email)
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
      .doc(email)
      .set({
        ...emptyUserData,
        email,
        name,
      });

    await firestore.collection(COLLECTION_NAME.SECRETS).doc(email).set({
      email,
      password,
    });

    await firestore
      .collection(COLLECTION_NAME.ACHIEVEMENTS)
      .doc(email)
      .set(emptyAchievementData);

    await firestore
      .collection(COLLECTION_NAME.FRIENDS)
      .doc(email)
      .set(emptyFriendList);

    await firestore
      .collection(COLLECTION_NAME.PHONE_SKINS)
      .doc(email)
      .set(emptyPhoneSkinsData);

    await firestore
      .collection(COLLECTION_NAME.JOURNEY)
      .doc(email)
      .set(emptyJourneyData);

    await firestore
      .collection(COLLECTION_NAME.AVATARS)
      .doc(email)
      .set(emptyAvatarData);

    res.set({ "Access-Control-Allow-Origin": "*" });
    res.send({
      success: true,
      message: "OK",
      token: jwt.sign(email, SECRET_KEY),
    });
  }
});

export const getUserData = functions.https.onRequest(async (req, res) => {
  let { token } = JSON.parse(req.body);

  try {
    let email = jwt.verify(token, SECRET_KEY) as string;

    const userSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(email)
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
    let email = jwt.verify(token, SECRET_KEY) as string;

    const achievementsSnapshot = await firestore
      .collection(COLLECTION_NAME.ACHIEVEMENTS)
      .doc(email)
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
  let email = jwt.verify(token, SECRET_KEY) as string;

  const journeySnapshot = await firestore
    .collection(COLLECTION_NAME.JOURNEY)
    .doc(email)
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
  let email = jwt.verify(token, SECRET_KEY) as string;

  const avatarsSnapshot = await firestore
    .collection(COLLECTION_NAME.AVATARS)
    .doc(email)
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
  let email = jwt.verify(token, SECRET_KEY) as string;

  const phoneSkinsSnapshot = await firestore
    .collection(COLLECTION_NAME.PHONE_SKINS)
    .doc(email)
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

    let { email, id, levelNo, score, rewards } = jwt.verify(
      token,
      SECRET_KEY
    ) as {
      email: string;
      id: string;
      levelNo: number;
      score: number;
      rewards: Array<any>;
    };

    const journeySnapshot = await firestore
      .collection(COLLECTION_NAME.JOURNEY)
      .doc(email)
      .get();
    const userSnapshot = await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(email)
      .get();
    const achievementSnapshot = await firestore
      .collection(COLLECTION_NAME.ACHIEVEMENTS)
      .doc(email)
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
        .doc(email)
        .set(journeyData);

      await firestore
        .collection(COLLECTION_NAME.USERS)
        .doc(email)
        .set(userData);

      await firestore
        .collection(COLLECTION_NAME.ACHIEVEMENTS)
        .doc(email)
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
  let { type, id, price, email } = jwt.verify(token, SECRET_KEY) as {
    email: string;
    type: string;
    id: string;
    price: number;
  };

  const userSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(email)
    .get();

  const userData = userSnapshot.data();

  if (userData) {
    if (userData.currency >= price) {
      switch (type) {
        case "avatar": {
          const avatarSnapshot = await firestore
            .collection(COLLECTION_NAME.AVATARS)
            .doc(email)
            .get();
          const avatarData = avatarSnapshot.data();

          if (avatarData && !avatarData[id]) {
            userData.currency -= price;
            avatarData[id] = true;

            await firestore
              .collection(COLLECTION_NAME.AVATARS)
              .doc(email)
              .set(avatarData);

            await firestore
              .collection(COLLECTION_NAME.USERS)
              .doc(email)
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
            .doc(email)
            .get();
          const phoneSkinData = phoneSkinSnapshot.data();

          if (phoneSkinData && !phoneSkinData[id]) {
            userData.currency -= price;
            phoneSkinData[id] = true;

            await firestore
              .collection(COLLECTION_NAME.PHONE_SKINS)
              .doc(email)
              .set(phoneSkinData);

            await firestore
              .collection(COLLECTION_NAME.USERS)
              .doc(email)
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
  let { email, phoneSkin, avatar } = jwt.verify(token, SECRET_KEY) as {
    email: string;
    phoneSkin: string;
    avatar: string;
  };

  const userSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(email)
    .get();
  const userData = userSnapshot.data();

  if (userData) {
    userData.phoneSkin = phoneSkin;
    userData.avatar = avatar;

    await firestore.collection(COLLECTION_NAME.USERS).doc(email).set(userData);

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
    let email = jwt.verify(token, SECRET_KEY) as string;

    const avatarsSnapshot = await firestore
      .collection(COLLECTION_NAME.AVATARS)
      .doc(email)
      .get();
    const phoneSkinsSnapshot = await firestore
      .collection(COLLECTION_NAME.PHONE_SKINS)
      .doc(email)
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
