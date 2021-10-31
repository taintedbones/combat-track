import { useState, useEffect } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore/";
import { database } from "../firebaseConfig";

export const useActors = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const actorsCol = collection(database, "actors");
        const actorsSnapshot = await getDocs(actorsCol);
        const actorsList = actorsSnapshot.docs.map((doc) => doc.data());
        const actorsIdList = actorsList.map((actor, index) => ({ ...actor, id: index }));
        // console.log(actorsIdList);
        setLoading(false);
        setActors(actorsIdList);
        return actorsIdList;
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

export const useScenarios = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scenarios, setScenarios] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const scenariosCol = collection(database, "scenarios");
        const scenariosSnapshot = await getDocs(scenariosCol);
        const scenariosList = scenariosSnapshot.docs.map((doc) => doc.data());
        const scenariosIdList = scenariosList.map((actor, index) => ({ ...actor, id: index }));
        // console.log(scenariosIdList);
        setLoading(false);
        setScenarios(scenariosIdList);
        return scenariosIdList;
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchActors();
  }, [setError, setLoading, setScenarios]);

  return { error, loading, scenarios };
};

export const useUsers = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const usersCol = collection(database, "users");
        const usersSnapshot = await getDocs(usersCol);
        const usersList = usersSnapshot.docs.map((doc) => doc.data());
        const usersIdList = usersList.map((actor, index) => ({ ...actor, id: index }));
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
    fetchActors();
  }, [setError, setLoading, setUsers]);

  return { error, loading, users };
};
