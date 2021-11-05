import React, { useEffect, useState } from "react";
import { useScenario } from "../../hooks/useDatabase";
import { Grid, SelectChangeEvent } from "@mui/material";
import { GridCellEditCommitParams, GridRowParams, MuiEvent, GridCallbackDetails } from "@mui/x-data-grid";
import ConfirmationDialog from "./components/Dialogs/ConfirmationDialog";
import AlertDialog from "./components/Dialogs/AlertDialog";
import CombatToolbar from "./components/Toolbar";
import CombatDataTable from "../../components/DataTables/CombatDataTable";
import CombatSetupDataTable from "../../components/DataTables/CombatSetupDataTable";
import CombatSetupToolbar from "./components/SetupToolbar";
import { useStyles } from "../../ThemeProvider";

// spinner used to modify values on combat table
// TODO: update spinners on change
// export function renderSpinner(params) {
//   return (
//     <TextField
//       type="number"
//       defaultValue={params.value}
//       inputProps={{ min: 0, max: 99, style: { color: 'white', fontSize: 14 } }}

//     />
//   );
// }

export default function Combat() {
  const classes = useStyles();
  const { loading, scenario, updateScenarioName, setScenario } = useScenario();
  const [scenarioName, setScenarioName] = useState<string>("skeletons");
  const [sortedScenario, setSortedScenario] = useState<any[]>([]);
  const [combatStarted, setCombatStarted] = useState(false);
  const [roundNum, setRoundNum] = useState(1);
  const [currTurnName, setCurrTurnName] = useState<string>();
  const [currTurnId, setCurrTurnId] = useState<number>();
  const [turnIndex, setTurnIndex] = useState(0);
  const [selectedActor, setSelectedActor] = useState<any>();
  const [nextAvailId, setNextAvailId] = useState<number>();
  const [addTriggered, setAddTriggered] = useState<boolean>(false);
  const [backTriggered, setBackTriggered] = useState<boolean>(false);
  const [isValidSetup, setIsValidSetup] = useState<boolean>(false);
  const [isValidCombat, setIsValidCombat] = useState<boolean>(true); // assume true if user proceeds to combat

  const handleStartCombat = () => {
    const temp = scenario.slice().sort((a, b) => b.initiative - a.initiative);

    setSortedScenario(temp);
    setCurrTurnId(temp[0].id);
    setCurrTurnName(temp[0].name);
    setNextAvailId(temp.length);
    setCombatStarted(true);
    setTurnIndex(0);
    setSelectedActor(undefined);
    setIsValidCombat(true);
  };

  const handleBackClicked = () => {
    setBackTriggered(true);
    setIsValidSetup(checkValidity(scenario.slice())); // if back is clicked, we can assume all actors
  };

  const handleCombatCellCommit = (
    params: GridCellEditCommitParams,
    event: MuiEvent<React.SyntheticEvent>,
    details: GridCallbackDetails
  ) => {
    let temp = sortedScenario.slice();
    let index = temp.findIndex((actor) => actor.id === params.id);
    temp[index][params.field] = params.value;

    // resort table by initiative if that field is altered
    if (params.field === "initiative") {
      temp = temp.slice().sort((a, b) => b.initiative - a.initiative);
    }

    console.log("commit");

    setSortedScenario(temp);
    // setIsValidCombat(checkValidity(temp));
  };

  useEffect(() => {
    if (sortedScenario.length > 0) {
      setIsValidCombat(checkValidity(sortedScenario));
      setTurnIndex(0);
      setCurrTurnName(sortedScenario[0].name);
      setCurrTurnId(sortedScenario[0].id);
    } else {
      setIsValidCombat(false); // there are no actors
    }
  }, [sortedScenario]); // useEffect for combat events

  // manages turn index & round number at end of each actor turn
  const handleTurnEnd = () => {
    if (turnIndex + 1 === sortedScenario.length) {
      setTurnIndex(0);
      setRoundNum(roundNum + 1);
    } else {
      setTurnIndex(turnIndex + 1);
    }
  };

  const handleSelectActor = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
    details: GridCallbackDetails
  ) => {
    setSelectedActor(params.row);
    console.log("Selected actor: ", params.row);
  };

  // removes actor fromt the table
  const handleDeleteActor = () => {
    // Error handling: maybe add a confirmation dialog
    if (selectedActor !== undefined) {
      let temp;
      combatStarted ? (temp = sortedScenario.slice()) : (temp = scenario.slice());
      let index = temp.findIndex((actor) => actor.id === selectedActor.id);

      temp.splice(index, 1);
      combatStarted ? setSortedScenario(temp) : setScenario(temp);
      if (temp.length > 0) {
        combatStarted ? setIsValidCombat(checkValidity(temp)) : setIsValidSetup(checkValidity(temp));
      } else {
        combatStarted ? setIsValidCombat(false) : setIsValidSetup(false);
      }
    }
  };

  // Changes add state if add button clicked on combat or setup
  const handleAddClicked = () => {
    setAddTriggered(true);
    combatStarted ? setNextAvailId(sortedScenario.length) : setNextAvailId(scenario.length);
  };

  // Adds actor chosen from dialog or empty row to either table
  const handleAddActor = (actor) => {
    let temp;
    let tempActor;

    combatStarted ? (temp = sortedScenario.slice()) : (temp = scenario.slice());
    console.log(temp);

    if (actor === "custom") {
      // creates blank actor row to be added to table
      tempActor = {
        initiative: 0,
        hp: 0,
        ac: 0,
        dc: 0,
        name: "",
        type: "",
        notes: "",
        id: nextAvailId,
      };
    } else {
      tempActor = {
        initiative: 0,
        hp: actor.hp,
        ac: actor.ac,
        dc: actor.dc,
        name: actor.name,
        type: actor.type,
        notes: actor.notes,
        id: nextAvailId,
      };
    }

    temp.push(tempActor);
    if (nextAvailId === undefined) {
      setNextAvailId(0);
    } else {
      setNextAvailId(nextAvailId + 1); // ensures all ids are unique
    }
    setTurnIndex(0);
    combatStarted ? setSortedScenario(temp) : setScenario(temp);
    combatStarted ? setIsValidCombat(false) : setIsValidSetup(false); // set false since all actors start with 0 initiative
  };

  const handleScenarioChange = (event: SelectChangeEvent<any>, child?: object) => {
    updateScenarioName(event.target.value);
    setScenarioName(event.target.value);
    setIsValidSetup(false); // invalid since every scenario has default 0 init
  };

  const handleAlertDialogClose = () => {
    setBackTriggered(false);
    setCombatStarted(false);
    setRoundNum(0);
    setNextAvailId(scenario.length);
    setSelectedActor(undefined);
  };

  useEffect(() => {
    if (sortedScenario.length > 0 && !loading) {
      setSortedScenario(sortedScenario);
    }
  }, [loading, sortedScenario]);

  // Updates current turn's name & id when turn index is updated
  useEffect(() => {
    const setActor = () => {
      setCurrTurnName(sortedScenario[turnIndex].name);
      setCurrTurnId(sortedScenario[turnIndex].id);
    };
    if (sortedScenario.length > 0 && !loading) {
      setActor();
    }
  }, [turnIndex, loading]);

  const checkValidity = (actors: any[]) => {
    const found = actors.find((actor) => actor.initiative <= 0);
    return !found; // will return false if there is any actor with 0 initiative
  };

  const renderCombat = (
    <React.Fragment>
      <CombatDataTable
        actors={sortedScenario}
        styling={classes.dataGrid}
        turnId={currTurnId}
        onActorSelect={handleSelectActor}
        onCellCommit={handleCombatCellCommit}
      />
      <CombatToolbar
        onBackClicked={handleBackClicked}
        onAddActor={handleAddClicked}
        onDeleteActor={handleDeleteActor}
        isValidActors={isValidCombat}
        currentTurnName={currTurnName}
        turnIndex={turnIndex}
        roundNum={roundNum}
        endTurn={handleTurnEnd}
      />
    </React.Fragment>
  );

  const renderSetup = (
    <React.Fragment>
      <CombatSetupDataTable
        actors={scenario}
        loading={loading}
        styling={classes.dataGrid}
        onActorSelect={handleSelectActor}
        checkValidity={checkValidity}
        setIsValid={setIsValidSetup}
      />
      <CombatSetupToolbar
        onStartCombat={handleStartCombat}
        onScenarioChange={handleScenarioChange}
        scenarioName={scenarioName}
        onAddActor={handleAddClicked}
        onDeleteActor={handleDeleteActor}
        isValidActors={isValidSetup}
      />
    </React.Fragment>
  );

  const renderAlertDialog = (
    <AlertDialog
      title="Warning"
      dialog="You will lose combat. Do you want to proceed?"
      open={backTriggered}
      setOpen={setBackTriggered}
      continueClicked={handleAlertDialogClose}
    />
  );

  const renderConfirmDialog = (
    <ConfirmationDialog open={addTriggered} setOpen={setAddTriggered} onClose={handleAddActor} />
  );

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" direction="row" spacing={2} className={classes.grid}>
        <Grid item container xs={12} spacing={3}>
          {combatStarted ? renderCombat : renderSetup}
        </Grid>
      </Grid>
      {addTriggered && renderConfirmDialog}
      {backTriggered && renderAlertDialog}
    </div>
  );
}
