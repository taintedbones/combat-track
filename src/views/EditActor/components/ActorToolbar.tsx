import { Button, Grid } from '@mui/material';
import React from 'react';

export default function ActorToolbar({ onAddClicked, onDeleteClicked, onEditClicked }) {
  return (
      <React.Fragment>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onAddClicked}>
            Add Actor
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onEditClicked} >
            Edit Actor
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onDeleteClicked}>
            Delete Actor
          </Button>
        </Grid>
      </React.Fragment>
  );
}
