import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// change details to be stored in env file instead of hard coded
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBwzDeaFXRPFEqQhk1kWM2YqL7Pr6lL7aY",
  authDomain: "combat-track.firebaseapp.com",
  projectId: "combat-track",
  storageBucket: "combat-track.appspot.com",
  messagingSenderId: "725526804018",
  appId: "1:725526804018:web:d4fdf9e7e445103cee6e2b",
});

export const database = getFirestore(firebaseApp);
