import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  DocumentData,
} from 'firebase/firestore/';
import { database } from '../firebaseConfig';

export const useActors = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const actorsCol = collection(database, 'actors');
        const actorsSnapshot = await getDocs(actorsCol);
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

async function getListOfScenarios() {
  const snapshot = await getDocs(collection(database, 'scenarios'));
  let scenarioList: any[] = [];
  snapshot.forEach((doc) => scenarioList.push(doc.id));
  return scenarioList;
}

// get specific scenario (maybe turn this vv into specific)
export const useScenario = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scenario, setScenario] = useState<any[]>([]);
  const [scenarioName, setScenarioName] = useState<string>('skeletons');

  async function getActorFromRef(refPath) {
    const docName = refPath.split('/')[1];
    const docRef = doc(database, 'actors', docName);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }

  const updateScenario = (scenarioName) => {
    setScenarioName(scenarioName)
  }

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

  return { error, loading, scenario, updateScenario };
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
