import { Button, Typography, Grid } from "@mui/material";

const typography = {
  color: "white",
  fontSize: "2rem",
};

export default function Toolbar() {
  return (
    <Grid container spacing={4}>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Typography sx={typography}>Current Turn:</Typography>
        </Grid>
        <Grid container item xs={2}>
          <Typography sx={typography}>{"<NAME>"}</Typography>
        </Grid>
        <Grid container item xs justifyContent="flex-end">
          <Typography sx={typography}>{"Round: <ROUND #>"}</Typography>
        </Grid>
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
        <Button variant="contained" fullWidth>
          Select Scenario
        </Button>
      </Grid>
      <Grid item xs>
        <Button variant="contained" fullWidth>
          End Combat
        </Button>
      </Grid>
    </Grid>
  );
}
