import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { COLLECTION_NAME } from "./constants/collectionName";

admin.initializeApp();
const firestore = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const login = functions.https.onRequest(async (req, res) => {
  const { email, password } = req.body;

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

    res.send({
      success: true,
      message: "OK",
      userData: userSnapshot.data(),
    });
  } else {
    res.send({
      success: false,
      message: "Email or password incorrect!",
      userData: {},
    });
  }
});

export const signup = functions.https.onRequest(async (req, res) => {
  const emptyUserData = {
    email: "",
    name: "",
    currency: 0,
    currentExp: 0,
    profilePicBase64: "",
    border: "",
    unlockedAchievements: [],
    unlockedSkinId: ["iphone6"],
    phoneSkinId: "iphone6",
    journeyData: [
      {
        id: "helloWorld",
        completedLevel: 1,
      },
    ],
  };

  const { email, password, name } = req.body;

  const userSnapshot = await firestore
    .collection(COLLECTION_NAME.USERS)
    .doc(email)
    .get();

  const userData = userSnapshot.data();

  if (userData) {
    res.send({
      success: false,
      message: "Account already exist!",
      userData: {},
    });
  } else {
    await firestore
      .collection(COLLECTION_NAME.USERS)
      .doc(email)
      .set({
        ...emptyUserData,
        email,
        password,
        name,
      });

    res.send({
      success: true,
      message: "OK",
      userData: {
        ...emptyUserData,
        email,
        password,
        name,
      },
    });
  }
});
