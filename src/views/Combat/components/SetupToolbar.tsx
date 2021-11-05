import { Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';

export default function CombatSetupToolbar({ onStartCombat, onScenarioChange, scenarioName, onAddActor, onDeleteActor }) {
  return (
    <Grid item container xs={12}>
      <Grid item container spacing={4}>
        <Grid item xs>
          <InputLabel id="select-scenario-label">Select Scenario</InputLabel>
          <Select
            labelId="select-scenario-label"
            label="Scenario"
            value={scenarioName}
            onChange={onScenarioChange}
            style={{ width: '100%', color: 'white' }}
          >
            <MenuItem value="skeletons">Skeletons</MenuItem>
            <MenuItem value="vampires">Vampires</MenuItem>
            <MenuItem value="orcs">Orcs</MenuItem>
          </Select>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onAddActor}>
            Add Actor
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onDeleteActor}>
            Delete Actor
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onStartCombat}>
            Start Combat
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
