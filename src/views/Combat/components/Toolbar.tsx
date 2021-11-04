import { Button, Typography, Grid } from '@mui/material';

export default function CombatToolbar({
  onBackClicked,
  currentTurnName,
  roundNum,
  endTurn,
  onAddActor,
  onDeleteActor,
}) {
  return (
    <Grid item container xs={12}>
      <Grid item container spacing={4}>
        <Grid item container spacing={4}>
          <Grid item xs={2}>
            <Typography variant="h5">Current Turn:</Typography>
          </Grid>
          <Grid container item xs={2}>
            <Typography variant="h5">{`${currentTurnName}`}</Typography>
          </Grid>
          <Grid container item xs justifyContent="flex-end">
            <Typography variant="h5">{`Round: ${roundNum}`}</Typography>
          </Grid>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onBackClicked}>
            Back
          </Button>
        </Grid>
        <Grid item xs>
          {/* <Button variant="contained" fullWidth onClick={onAddActor}> */}
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
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={endTurn}
          >
            End Turn
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" color="error" fullWidth>
            End Combat
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
