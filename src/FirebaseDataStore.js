import * as fb from "firebase/database";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

class FirebaseDataStore {
  constructor() {
    console.log("running the FirebaseDataStore function");
    this.db = db;
  }

  async getActors() {
    const actors = [];
    const querySnapshot = await getDocs(collection(db, "actors"));

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      actors.push(doc.data());
    });

    return actors;
  }
}

export default FirebaseDataStore;
