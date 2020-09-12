import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as jwt from "jsonwebtoken";

import { COLLECTION_NAME } from "./constants/collectionName";
import {
  emptyJourneyData,
  emptyAchievementData,
  emptyPhoneSkinsData,
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
    border: "",
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

    const journeyData = journeySnapshot.data();
    const userData = userSnapshot.data();

    if (journeyData && userData) {
      journeyData[id][levelNo - 1].highScore =
        score > journeyData[id][levelNo - 1].highScore
          ? score
          : journeyData[id][levelNo - 1].highScore;
      journeyData[id][levelNo - 1].isFirstTime = false;

      if (journeyData[id][levelNo]) {
        journeyData[id][levelNo].unlocked = true;
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
