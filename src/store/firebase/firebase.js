import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";

var backConfig = {
  apiKey: "AIzaSyCd_de-F6hb8u0ghjkU_1gSc93WjbNs7tU",
  authDomain: "helpsl421.firebaseapp.com",
  databaseURL: "https://helpsl421.firebaseio.com",
  projectId: "helpsl421",
  storageBucket: "helpsl421.appspot.com",
  messagingSenderId: "205196539896"
};
firebase.initializeApp(backConfig);

export default firebase;
