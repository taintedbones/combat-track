import { Button, Grid } from '@mui/material';
import React from 'react';

export default function ActorToolbar() {
  return (
      <React.Fragment>
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
      </React.Fragment>
  );
}
