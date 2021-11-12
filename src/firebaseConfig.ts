import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// change details to be stored in env file instead of hard coded
const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "combat-track.firebaseapp.com",
  projectId: "combat-track",
  storageBucket: "combat-track.appspot.com",
  messagingSenderId: "725526804018",
  appId: "1:725526804018:web:ca2510bb0726889eee6e2b"
});



export const database = getFirestore(firebaseApp);
