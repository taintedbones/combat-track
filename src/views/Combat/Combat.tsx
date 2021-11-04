import React, { useEffect, useState } from 'react';
import { useScenario } from '../../hooks/useDatabase';
import { Grid, TextField, SelectChangeEvent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  GridCellEditCommitParams,
  MuiEvent,
  GridCallbackDetails,
} from '@mui/x-data-grid';
import CombatToolbar from './components/Toolbar';
import CombatDataTable from '../../components/DataTables/CombatDataTable';
import CombatSetupDataTable from '../../components/DataTables/CombatSetupDataTable';
import CombatSetupToolbar from './components/SetupToolbar';
import '../../styles/App.css';

const useStyles = makeStyles(() => {
  return {
    root: {
      paddingTop: '100px',
    },
    dataGrid: {
      color: 'white',
      width: '100%',
      height: '60vh',
      '& .col-header': {
        backgroundColor: 'purple',
      },
      '& .rowTheme-selected-true': {
        backgroundColor: '#ED6C02',
      },
    },
    grid: {
      height: '80%',
    },
  };
});

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
  const { loading, scenario, updateScenario } = useScenario();
  const [scenarioName, setScenarioName] = useState<string>('skeletons');
  const [sortedScenario, setSortedScenario] = useState<any[]>([]);
  const [combatStarted, setCombatStarted] = useState(false);
  const [roundNum, setRoundNum] = useState(1);
  const [currTurnName, setCurrTurnName] = useState<string>();
  const [currTurnId, setCurrTurnId] = useState<number>();
  const [turnIndex, setTurnIndex] = useState(0);
  const [selectedActor, setSelectedActor] = useState<any>();
  const [nextAvailId, setNextAvailId] = useState<number>(0);

  const handleStartCombat = () => {
    const temp = scenario.slice().sort((a, b) => b.initiative - a.initiative);

    setSortedScenario(temp);
    setCurrTurnId(temp[0].id);
    setCurrTurnName(temp[0].name);
    setNextAvailId(temp.length);
    setCombatStarted(true);
    setTurnIndex(0);
  };

  const handleBackClicked = () => {
    // Error handling: display prompt asking if user is sure at some point
    setCombatStarted(false);
    setRoundNum(0);
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
    if (params.field === 'initiative') {
      temp = temp.slice().sort((a, b) => b.initiative - a.initiative);
    }

    setSortedScenario(temp);
    setTurnIndex(0);
    setCurrTurnName(sortedScenario[0].name);
    setCurrTurnId(sortedScenario[0].id);
  };

  // manages turn index & round number at end of each actor turn
  const handleTurnEnd = () => {
    if (turnIndex + 1 === sortedScenario.length) {
      setTurnIndex(0);
      setRoundNum(roundNum + 1);
    } else {
      setTurnIndex(turnIndex + 1);
    }
  };

  const handleSelectActor = (actor) => {
    setSelectedActor(actor);
  };

  const handleDeleteActor = () => {
    // Error handling: maybe add a confirmation dialog
    if (selectedActor !== undefined) {
      let temp = sortedScenario.slice();
      let index = temp.findIndex((actor) => actor.id === selectedActor.id);

      temp.splice(index, 1);
      setSortedScenario(temp);
    }
  };

  // Adds blank row to table
  const handleAddActor = () => {
    // creates blank actor row to be added to table
    let tempActor = {
      initiative: 0,
      hp: 0,
      ac: 0,
      dc: 0,
      name: '',
      type: '',
      notes: '',
      id: nextAvailId,
    };

    setNextAvailId(nextAvailId + 1); // ensures all ids are unique

    let temp = sortedScenario.slice();
    temp.push(tempActor);
    setSortedScenario(temp);
  };

  const handleScenarioChange = (event: SelectChangeEvent<any>, child?: object) => {
     updateScenario(event.target.value);
     setScenarioName(event.target.value);
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
        onAddActor={handleAddActor}
        onDeleteActor={handleDeleteActor}
        currentTurnName={currTurnName}
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
      />
      <CombatSetupToolbar onStartCombat={handleStartCombat} onScenarioChange={handleScenarioChange} scenarioName={scenarioName} />
    </React.Fragment>
  );

  return (
    <div className="container">
      <Grid
        container
        justifyContent="center"
        direction="row"
        spacing={2}
        className={classes.grid}
        xs={12}
      >
        <Grid item container xs={12} spacing={3}>
          {combatStarted ? renderCombat : renderSetup}
        </Grid>
      </Grid>
    </div>
  );
}
