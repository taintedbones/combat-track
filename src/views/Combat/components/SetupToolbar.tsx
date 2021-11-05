import { Button, Tooltip, Grid, Select, MenuItem, InputLabel, useTheme } from "@mui/material";

export default function CombatSetupToolbar({
  onStartCombat,
  onScenarioChange,
  scenarioName,
  onAddActor,
  onDeleteActor,
  isValidActors,
}) {
  const theme = useTheme();

  return (
    <Grid item container>
      <Grid item container spacing={4} alignItems="center">
        <Grid item xs>
          <InputLabel id="select-scenario-label" sx={{ color: "white" }}>
            Select Scenario
          </InputLabel>
          <Select
            labelId="select-scenario-label"
            label="Scenario"
            value={scenarioName}
            onChange={onScenarioChange}
            style={{ width: "100%", color: "white", backgroundColor: `${theme.palette.secondary.main}` }}
          >
            <MenuItem value="skeletons">Skeletons</MenuItem>
            <MenuItem value="vampires">Vampires</MenuItem>
            <MenuItem value="orcs">Orcs</MenuItem>
          </Select>
        </Grid>
        <Grid xs sx={{ padding: "55px 10px 0px 20px" }}>
          <Button variant="contained" fullWidth onClick={onAddActor}>
            Add Actor
          </Button>
        </Grid>
        <Grid xs sx={{ padding: "55px 0px 0px 0px" }}>
          <Button variant="contained" fullWidth onClick={onDeleteActor}>
            Delete Actor
          </Button>
        </Grid>
        <Grid xs sx={{ padding: "55px 0px 0px 10px" }}>
          {isValidActors ? (
            <Button variant="contained" fullWidth onClick={onStartCombat}>
              Start Combat
            </Button>
          ) : (
            <Tooltip title="All actors must have an initiative greater than 0." placement="top">
              <span>
                <Button variant="contained" fullWidth disabled>
                  Start Combat
                </Button>
              </span>
            </Tooltip>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
