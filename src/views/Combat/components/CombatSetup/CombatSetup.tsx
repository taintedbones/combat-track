import { useState } from "react";
import { GridRowParams, GridCellEditCommitParams } from "@mui/x-data-grid";
import CombatSetupToolbar from "./SetupToolbar";
import CombatSetupDataTable from "../../../../components/DataTables/CombatSetupDataTable";

export default function CombatSetup({
  actors,
  loading,
  scenarioName,
  isValidSetup,
  setIsValidSetup,
  setSetupActors,
  onScenarioChange,
  onCombatStart,
}) {
  const [selectedActor, setSelectedActor] = useState<any>(null);

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
    setIsValidSetup(isValid);
    setSetupActors([...temp]);
  };

  const handleSelectActor = (params: GridRowParams) => {
    setSelectedActor(params.row);
    // console.log("Selected actor: ", params.row);
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

    setSetupActors([...actors, tempActor]);
    console.log("After add: ", [...actors, tempActor]);
  };

  const handleDeleteActor = () => {
    if (selectedActor) {
      // set actors to new array with the selected actor filtered out
      const temp = actors.filter((actor) => {
        return actor.id !== selectedActor.id;
      });
      setSetupActors([...temp]);
      console.log("After delete: ", [...temp]);
    }
  };

  return (
    <>
      <CombatSetupDataTable
        actors={actors}
        loading={loading}
        onActorSelect={handleSelectActor}
        onCellCommit={handleCellCommit}
      />
      <CombatSetupToolbar
        onStartCombat={onCombatStart}
        onScenarioChange={onScenarioChange}
        scenarioName={scenarioName}
        onAddActor={handleAddActor}
        onDeleteActor={handleDeleteActor}
        isValidSetup={isValidSetup}
      />
    </>
  );
}
