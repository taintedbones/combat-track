import { useEffect, useState } from "react";
import { useStyles } from "../../ThemeProvider";
import { useScenario } from "../../hooks/useDatabase";

import { Grid } from "@mui/material";
import CombatSetup from "./components/CombatSetup/CombatSetup";
import CombatStart from "./components/CombatStart/CombatStart";

export default function Combat() {
  const classes = useStyles();
  const [scenarioName, setScenarioName] = useState<string>("skeletons");
  const { loading, scenario } = useScenario(scenarioName);
  const [combatStarted, setCombatStarted] = useState(false);
  const [isValidSetup, setIsValidSetup] = useState(false);
  const [setupActors, setSetupActors] = useState(scenario);
  const [combatActors, setCombatActors] = useState(scenario);

  // once scenario loads, setSetupActors to it
  useEffect(() => {
    setSetupActors(scenario);
    setCombatActors(scenario); // set to combat as well for backup
  }, [scenario]);

  const handleCombatStart = () => {
    setCombatStarted(true);
    // sort the actors for the combat phase
    const temp = setupActors.slice().sort((a, b) => b.initiative - a.initiative);
    setSetupActors([...temp]);
    setCombatActors([...temp]);
    console.log([...temp]);
  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" direction="row" spacing={2} className={classes.grid}>
        <Grid item container xs={12} spacing={3}>
          {combatStarted ? (
            <CombatStart />
          ) : (
            <CombatSetup
              actors={setupActors}
              loading={loading}
              scenarioName={scenarioName}
              isValidSetup={isValidSetup}
              setIsValidSetup={setIsValidSetup}
              setSetupActors={setSetupActors}
              onScenarioChange={setScenarioName}
              onCombatStart={handleCombatStart}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
