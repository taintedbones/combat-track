import { Button, Grid, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  select: {
    width: '100%',
    color: 'white',
  },
  button: {
    height: '100%',
  },
});

export default function ScenarioToolbar() {
  const classes = useStyles();

  return (
    <Grid item container spacing={6}>
      <Grid item xs>
        <Select value='prompt' className={classes.select}>
          <MenuItem value='prompt'>Select Scenario</MenuItem>
          <MenuItem value='custom'>Custom</MenuItem>
          <MenuItem value='sample1'>sample1</MenuItem>
          <MenuItem value='sample2'>sample2</MenuItem>
        </Select>
      </Grid>
      <Grid item xs>
        <Button variant='contained' fullWidth className={classes.button}>
          Add Actor
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant='contained' fullWidth className={classes.button}>
          Delete Actor
        </Button>
      </Grid>
    </Grid>
  );
}
