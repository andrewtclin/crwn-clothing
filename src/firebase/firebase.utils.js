import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAhcOtaePnuuVXB1kXZoFIK0dYlL_b_eOQ",
  authDomain: "crwn-db-cdb78.firebaseapp.com",
  databaseURL: "https://crwn-db-cdb78.firebaseio.com",
  projectId: "crwn-db-cdb78",
  storageBucket: "crwn-db-cdb78.appspot.com",
  messagingSenderId: "458224329537",
  appId: "1:458224329537:web:3a1df6832d5b0030cd37c0",
  measurementId: "G-9KQV1959X2",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;