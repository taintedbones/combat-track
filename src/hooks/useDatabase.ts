import { useState, useEffect } from 'react';
import {
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  DocumentData,
  query,
  updateDoc,
  onSnapshot,
  where,
} from 'firebase/firestore/';
import { database } from '../firebaseConfig';
import { User } from '@firebase/auth';
import UseAuth from '../hooks/useAuth';

interface Actor {
  name: string;
  ac: number;
  dc: number;
  hp: number;
  initiative: number;
  notes: string;
  type: string;
  custom: boolean;
}

export const checkUserExists = async (userUid) => {
  let userList: any[] = [];
  const snapshot = await getDocs(collection(database, 'users'));
  snapshot.forEach((doc) => userList.push(doc.id));
  return userList.includes(userUid);
};

async function getListOfScenarios() {
  const snapshot = await getDocs(collection(database, 'scenarios'));
  let scenarioList: any[] = [];
  snapshot.forEach((doc) => scenarioList.push(doc.id));
  return scenarioList;
}

async function getActorFromRef(refPath) {
  const docName = refPath.split('/')[1];
  const docRef = doc(database, 'actors', docName);
  const snapshot = await getDoc(docRef);
  return snapshot.data();
}

export const addUser = async (user: User) => {
  try {
    await setDoc(doc(database, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      actors: [],
      party: [],
      scenarios: [],
    });
    console.log(user.displayName, ' successfully added to users!');
  } catch (error) {
    console.error(error);
  }
};

export const useActors = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const actorsRef = collection(database, 'actors');
        const q = query(actorsRef, where('custom', '==', false));
        const actorsSnapshot = await getDocs(q);
        const actorsList = actorsSnapshot.docs.map((doc) => doc.data()); // create list map of actors from snapshot
        const actorsIdList = actorsList.map((actor, idx) =>
          Object.defineProperty(actor, 'id', { value: idx })
        );
        const sortedList = actorsIdList.sort((a, b) => {
          if (a.initiative === b.initiative) {
            return b.name - a.name;
          } else {
            return b.initiative - a.initiative;
          }
        });
        const temp = sortedList.map((actor, index) =>
          Object.defineProperty(actor, 'index', { value: index })
        );
        // console.log(actorsIdList);
        setLoading(false);
        setActors(temp);
        return sortedList;
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchActors();
  }, [setError, setLoading, setActors]);

  return { error, loading, actors };
};

// get specific scenario (maybe turn this vv into specific)
export const useScenario = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState<any[]>([]);
  const [scenarioName, setScenarioName] = useState<string>('skeletons');

  const updateScenarioName = (scenarioName) => {
    setScenarioName(scenarioName);
  };

  useEffect(() => {
    const fetchScenario = async () => {
      setLoading(true);
      try {
        const docRef = doc(database, 'scenarios', scenarioName);
        const scenarioSnapshot = await getDoc(docRef);
        const actorRefsList = scenarioSnapshot.get('actors');

        const actorList = await Promise.all(
          actorRefsList.map(async (actorRef, idx) => {
            try {
              const actor = await getActorFromRef(actorRef.path);
              return {
                ...actor,
                id: idx,
              };
            } catch (err) {
              console.log(err);
            }
          })
        );

        setScenario(actorList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchScenario();
  }, [scenarioName]);

  return { error, loading, scenario, updateScenarioName, setScenario };
};

export const useUsers = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersCol = collection(database, 'users');
        const usersSnapshot = await getDocs(usersCol);
        const usersList = usersSnapshot.docs.map((doc) => doc.data());
        const usersIdList = usersList.map((actor, index) => ({
          ...actor,
          id: index,
        }));
        // console.log(usersIdList);
        setLoading(false);
        setUsers(usersIdList);
        return usersIdList;
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchUsers();
  }, [setError, setLoading, setUsers]);

  return { error, loading, users };
};

// get array of party member objects
async function getParty(userId) {
  const docRef = doc(database, 'users', userId);
  const snapshot = await getDoc(docRef);
  const partyRefList = snapshot.get('party');

  const actorList = await Promise.all(
    partyRefList.map(async (actorRef, idx) => {
      try {
        const actor = await getActorFromRef(actorRef.path);
        return {
          ...actor,
          id: idx,
          doc: actorRef.path.split('/')[1],
        };
      } catch (err) {
        console.log(err);
      }
    })
  );

  return actorList;
}

export const useCustomActors = () => {
  const { user } = UseAuth();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [changeMade, setChangeMade] = useState<boolean>(false);
  const [customActors, setCustomActors] = useState<any[]>([]);
  // const [snapshot, setSnapshot] = useState<any>();

  console.log('Rerender hook: useCustomActors()');
  useEffect(() => {
    const fetchActors = async () => {
      console.log('fetchActors() Called');
      setLoading(true);
      try {
        if (user === false) {
          return;
        }

        const docRef = doc(database, 'users', user.uid);
        console.log(docRef);

        const snapshot = await getDoc(docRef);
        const actorRefsList = snapshot.get('actors');

        let actorList = await Promise.all(
          actorRefsList.map(async (actorRef, idx) => {
            try {
              const actor = await getActorFromRef(actorRef.path);
              const docName = actorRef.path.split('/')[1];
              return {
                ...actor,
                id: idx,
                doc: docName,
              };
            } catch (err) {
              console.log(err);
            }
          })
        );

        setCustomActors(actorList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };

    if (user) {
      fetchActors();
    } else {
      setLoading(false);
      setCustomActors([]);
    }
  }, [user, changeMade]);

  return { error, changeMade, setChangeMade, loading, customActors };
};

export const addActor = async (newActor, uid) => {
  try {
    const docRef = await addDoc(collection(database, 'actors'), newActor);
    console.log('Added doc: ', docRef.id);

    const userRef = doc(database, 'users', uid);
    await updateDoc(userRef, {
      actors: arrayUnion(docRef),
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteActor = async (actor, uid) => {
  try {
    const docRef = doc(database, 'actors', actor.doc)
    console.log("actor to be deleted: ", docRef);
    await deleteDoc(docRef);
    const userRef = doc(database, 'users', uid);

    await updateDoc(userRef, {
      actors: arrayRemove(docRef),
    });
  } catch (err) {
    console.error(err);
  }
};

// editActor()
export const editActor = async (actor) => {
  try {
    const docRef = doc(database, 'actors', actor.doc);
    console.log("actor to be edited: ", docRef);
    await updateDoc(docRef, {
      name: actor.name,
      ac: actor.ac,
      dc: actor.dc,
      hp: actor.hp,
      notes: actor.notes,
      type: actor.type
    });
    console.log("actor successfully edited");
  } catch (err) {
    console.error(err);
  }
};

// useCustomScenarios
