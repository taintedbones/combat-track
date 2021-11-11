import { Button, Grid } from '@mui/material';
import React from 'react';

export default function ActorToolbar({ onAddClicked, onDeleteClicked, onEditClicked, isDisabled }) {
  return (
      <React.Fragment>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onAddClicked}>
            Add Actor
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onEditClicked} disabled={isDisabled}>
            Edit Actor
          </Button>
        </Grid>
        <Grid item xs>
          <Button variant="contained" fullWidth onClick={onDeleteClicked} disabled={isDisabled}>
            Delete Actor
          </Button>
        </Grid>
      </React.Fragment>
  );
}
