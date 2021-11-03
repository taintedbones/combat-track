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
export const useScenarios = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scenarios, setScenarios] = useState<any[]>([]);
  // const [scenarioNames, setScenarioNames] = useState<string[]>([]);

  async function getActorFromRef(refPath) {
    const docName = refPath.split('/')[1];
    const docRef = doc(database, 'actors', docName);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }

  useEffect(() => {
    const fetchScenario = async () => {
      setLoading(true);
      try {
        const docRef = doc(database, 'scenarios', 'skeletons');
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

        setScenarios(actorList);
        setLoading(false);

        return actorList;
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchScenario();
  }, []);

  // useEffect(() => {
  //   const fetchScenario = async () => {
  //     setLoading(true);
  //     try {
  //       // create specific scenario reference
  //       const docRef = doc(database, 'scenarios', scenarioName);
  //       // get document from reference
  //       const scenarioSnapshot = await getDoc(docRef);
  //       // convert actors in array to actor objects
  //       const actorRefsList = scenarioSnapshot.get('actors');
  //       // console.log('actorRefs: ', actorRefsList);
  //       // console.log('path 1: ', actorRefsList[0].path);

  //       let actorList: any[] = [];

  //       for (let i = 0; i < actorRefsList.length; i++) {
  //         const temp = await getActorFromRef(actorRefsList[i].path);
  //         if(temp !== undefined) {
  //           Object.defineProperty(temp, "id", { value: i });
  //           // console.log("temp: ", temp["id"]);
  //           actorList.push(temp);
  //         }
  //       }

  //       // console.log('actorList: ', actorList);
  //       let scenarioNamesList = await getListOfScenarios();
  //       // console.log(scenarioNamesList);

  //       setLoading(false);
  //       setScenarios(actorList);
  //       setScenarioNames(scenarioNamesList);

  //       return actorList;
  //     } catch (error) {
  //       console.error(error);
  //       setLoading(false);
  //       setError(true);
  //     }
  //   };
  //   fetchScenario();
  //   }, [scenarioName]);

  return { error, loading, scenarios };
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
