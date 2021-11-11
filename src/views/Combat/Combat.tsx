import { useEffect, useState } from "react";
import { useStyles } from "../../ThemeProvider";
import { useScenario } from "../../hooks/useDatabase";

import { Grid } from "@mui/material";
import CombatSetup from "./components/CombatSetup/CombatSetup";
import CombatStart from "./components/CombatStart/CombatStart";

export default function Combat() {
  const classes = useStyles();
  const { loading, scenario, updateScenarioName, setScenario } = useScenario();
  const [scenarioName, setScenarioName] = useState("skeletons");
  const [combatStarted, setCombatStarted] = useState(false);
  const [isValidSetup, setIsValidSetup] = useState(false);
  const [setupActors, setSetupActors] = useState(scenario);
  const [combatActors, setCombatActors] = useState(scenario);

  // once scenario loads, setSetupActors to it
  useEffect(() => {
    setSetupActors(scenario);
    setCombatActors(scenario); // set to combat as well for backup
  }, [scenario]);

  const handleScenarioChange = (scenarioName: string) => {
    updateScenarioName(scenarioName);
    setScenarioName(scenarioName);
    setIsValidSetup(false);
  };

  const handleCombatStart = () => {
    setCombatStarted(true);
    // sort the actors for the combat phase
    const temp = setupActors.slice().sort((a, b) => b.initiative - a.initiative);
    setSetupActors([...temp]);
    setCombatActors([...temp]);
  };

  const handleCombatEnd = () => {
    setCombatStarted(false);
    console.log("here");
  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" direction="row" spacing={2} className={classes.grid}>
        <Grid item container xs={12} spacing={3}>
          {combatStarted ? (
            <CombatStart actors={combatActors} setCombatActors={setCombatActors} onCombatEnd={handleCombatEnd} />
          ) : (
            <CombatSetup
              actors={setupActors}
              loading={loading}
              scenarioName={scenarioName}
              isValidSetup={isValidSetup} //
              setIsValidSetup={setIsValidSetup} //
              setSetupActors={setSetupActors}
              onScenarioChange={handleScenarioChange}
              onCombatStart={handleCombatStart}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
