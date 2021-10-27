import { Button, Grid } from '@mui/material';

export default function ActorToolbar() {
  return (
    <Grid item container spacing={6}>
      <Grid item xs>
        <Button variant='contained' fullWidth>
          Add Actor
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant='contained' fullWidth>
          Delete Actor
        </Button>
      </Grid>
    </Grid>
  );
}
