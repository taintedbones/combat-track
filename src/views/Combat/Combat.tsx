import React, { useEffect, useState } from 'react';
import { useScenarios } from '../../hooks/useDatabase';
import { Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

export function renderSpinner(params) {
  return (
    <TextField
      type="number"
      defaultValue={params.value}
      inputProps={{ min: 0, max: 20, style: { color: 'white', fontSize: 14 } }}
    />
  );
}

export default function Combat() {
  const classes = useStyles();
  const { loading, scenarios } = useScenarios();
  const [combatStarted, setCombatStarted] = useState(false);
  const [roundNum, setRoundNum] = useState(1);
  const [currTurnName, setCurrTurnName] = useState<string>();
  const [currTurnId, setCurrTurnId] = useState<number>();
  const [turnIndex, setTurnIndex] = useState(0);
  const [sortedScenario, setSortedScenario] = useState<any[]>([]); // holds array of actors in combat scenario

  function CombatView() {
    if (combatStarted) {
      return (
        <React.Fragment>
          <CombatDataTable
            actors={sortedScenario}
            styling={classes.dataGrid}
            turnId={currTurnId}
          />
          <CombatToolbar
            onBackClicked={handleBackClicked}
            onAddActor={handleAddActor}
            currentTurnName={currTurnName}
            roundNum={roundNum}
            endTurn={handleTurnEnd}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CombatSetupDataTable
            actors={scenarios}
            loading={loading}
            styling={classes.dataGrid}
          />
          <CombatSetupToolbar onStartCombat={handleStartCombat} />
        </React.Fragment>
      );
    }
  }

  const handleStartCombat = () => {
    // check if all initiatives have value > 0 before changing state
    // display error modal if necessary
    setCombatStarted(true);

    // get  sorted copy of table by initiative
    setSortedScenario(() => {
      return scenarios.slice().sort((a, b) => b.initiative - a.initiative);
    });
  };

  const handleBackClicked = () => {
    // display prompt asking if user is sure at some point
    setCombatStarted(false);
    setRoundNum(0);
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

  const handleDeleteActor = () => {

  };

  // currently only adds temporary testing actor
  const handleAddActor = () => {
    let tempActor = {
      initiative: Math.floor(Math.random() * 20),
      hp: 96,
      ac: 17,
      dc: 14,
      name: 'Temp',
      type: 'companion',
      notes: 'Testing',
      id: sortedScenario.length,
    };

    setSortedScenario(
      [...sortedScenario, tempActor]
        .sort((a, b) => {
          if (a.initiative === b.initiative) {
            return b.name - a.name;
          } else {
            return b.initiative - a.initiative;
          }
        })
        .map((actor, index) => {
          return { ...actor, index: index };
        })
    );

    if (tempActor.initiative >= sortedScenario[turnIndex].initiative) {
      setTurnIndex(turnIndex + 1);
    }
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
  }, [turnIndex, loading, sortedScenario]);

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
          <CombatView />
        </Grid>
      </Grid>
    </div>
  );
}
