import { Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';

export default function CombatSetupToolbar({ onStartCombat }) {
  return (
    <Grid item container xs={12}>
      <Grid item container spacing={4}>
        <Grid item xs>
          <InputLabel id="select-scenario-label">Select Scenario</InputLabel>
          <Select
            labelId="select-scenario-label"
            label="Scenario"
            defaultValue="skeletons"
            style={{ width: '100%', color: 'white' }}
          >
            <MenuItem value="skeletons">Skeletons</MenuItem>
            <MenuItem value="vampires">Vampires</MenuItem>
            <MenuItem value="ogres">Ogres</MenuItem>
          </Select>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth>
            Add Actor
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth>
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
