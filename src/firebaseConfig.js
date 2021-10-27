import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// change details to be stored in env file instead of hard coded
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBwzDeaFXRPFEqQhk1kWM2YqL7Pr6lL7aY',
  authDomain: 'combat-track.firebaseapp.com',
  projectId: 'combat-track',
});

export const db = getFirestore();