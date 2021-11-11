import { useState } from "react";
import { GridRowParams, GridCellEditCommitParams } from "@mui/x-data-grid";
import CombatToolbar from "./CombatToolbar";
import CombatDataTable from "../../../../components/DataTables/CombatDataTable";

export default function CombatStart({ actors, setCombatActors, onCombatEnd }) {
  const [selectedActor, setSelectedActor] = useState<any>(null);
  const [roundNum, setRoundNum] = useState(1);
  const [turnIndex, setTurnIndex] = useState(0);
  const [currTurnName, setCurrTurnName] = useState<string>(actors[0].name);
  const [currTurnId, setCurrTurnId] = useState(actors[0].id);
  const [isValidCombat, setIsValidCombat] = useState(true);

  const checkValidity = (actors: any[]) => {
    const found = actors.find((actor) => actor.initiative <= 0);
    return !found; // will return false if there is any actor with 0 initiative
  };

  const handleCellCommit = (params: GridCellEditCommitParams) => {
    const temp = actors.slice();
    temp.forEach((value) => {
      if (value.id === params.id) {
        value[params.field] = params.value; // set the value of the associated field (ex. name, initiative, etc)
      }
    });
    const isValid = checkValidity(temp);
    const sortedActors = [...temp].sort((a, b) => b.initiative - a.initiative);
    setIsValidCombat(isValid);
    setCombatActors(sortedActors);

    // set turn index after actor change
    const updatedIndex = sortedActors.findIndex((actor) => actor.id === currTurnId);
    setTurnIndex(updatedIndex);
  };

  const handleSelectActor = (params: GridRowParams) => {
    setSelectedActor(params.row);
  };

  const handleAddActor = (actor) => {
    const maxId = Math.max.apply(
      Math,
      actors.map((actor) => {
        return actor.id;
      })
    ); //find largest id in actors and add 1 so always valid
    console.log(maxId, actors.length);

    const nextId = !!actors.length ? maxId + 1 : 0; // if there are no actors, set to 0

    const tempActor =
      actor === "custom"
        ? {
            initiative: 0,
            hp: 0,
            ac: 0,
            dc: 0,
            name: "",
            type: "",
            notes: "",
            id: nextId,
          }
        : {
            initiative: 0,
            hp: actor.hp,
            ac: actor.ac,
            dc: actor.dc,
            name: actor.name,
            type: actor.type,
            notes: actor.notes,
            id: nextId,
          };

    setCombatActors([...actors, tempActor]);
    setIsValidCombat(false); // automatically false since actors are added with 0 Init
    console.log(
      "After add: ",
      [...actors, tempActor].sort((a, b) => b.initiative - a.initiative)
    );
  };

  const handleDeleteActor = () => {
    if (actors.length === 1) {
      // don't allow them to delete all actors
      return;
    }
    if (selectedActor) {
      // set actors to new array with the selected actor filtered out
      const temp = actors.filter((actor) => {
        return actor.id !== selectedActor.id;
      });
      const sortedActors = [...temp].sort((a, b) => b.initiative - a.initiative);

      const updatedIndex = sortedActors.findIndex((actor) => actor.id === currTurnId);

      // if current turn actor wasn't deleted
      if (updatedIndex > 0) {
        // if any preceding actor is deleted, shift backwards
        if (updatedIndex < turnIndex) {
          setTurnIndex(updatedIndex);
          setCurrTurnName(sortedActors[updatedIndex].name);
          setCurrTurnId(sortedActors[updatedIndex].id);
        }
        // do nothing otherwise
      }
      // current turn actor was deleted
      else {
        if (turnIndex + 1 === actors.length) {
          // if deleted actor was the last on the list
          setTurnIndex(0);
          setRoundNum(roundNum + 1);
          setCurrTurnName(sortedActors[0].name);
          setCurrTurnId(sortedActors[0].id);
        }
        // move turn to next actor
        else {
          setCurrTurnName(sortedActors[turnIndex].name);
          setCurrTurnId(sortedActors[turnIndex].id);
        }
      }
      setCombatActors(sortedActors);
      setIsValidCombat(checkValidity(sortedActors));
      console.log("After delete: ", [...temp]);
    }
  };

  const handleTurnEnd = () => {
    const nextTurnIndex = turnIndex + 1;
    if (nextTurnIndex === actors.length) {
      setTurnIndex(0);
      setRoundNum(roundNum + 1);
      setCurrTurnName(actors[0].name);
      setCurrTurnId(actors[0].id);
    } else {
      setTurnIndex(nextTurnIndex);
      setCurrTurnName(actors[nextTurnIndex].name);
      setCurrTurnId(actors[nextTurnIndex].id);
    }
  };

  return (
    <>
      <CombatDataTable
        actors={actors}
        turnId={currTurnId}
        onActorSelect={handleSelectActor}
        onCellCommit={handleCellCommit}
      />
      <CombatToolbar
        onBackClicked={onCombatEnd}
        currentTurnName={currTurnName}
        roundNum={roundNum}
        turnIndex={turnIndex}
        endTurn={handleTurnEnd}
        onAddActor={handleAddActor}
        onDeleteActor={handleDeleteActor}
        isValidCombat={isValidCombat}
      />
    </>
  );
}
