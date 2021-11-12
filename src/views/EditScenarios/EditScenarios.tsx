import { Grid, Typography } from "@mui/material";
import DataTable from "../../components/DataTables/ScenariosDataTable";
import ScenarioToolbar from "./components/ScenarioToolbar";
import { useStyles } from "../../ThemeProvider";

export default function EditActors() {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" direction="row" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Scenario Editor</Typography>
        </Grid>
        <Grid item xs={12}>
          <DataTable classes={classes} />
        </Grid>
        <ScenarioToolbar />
      </Grid>
    </div>
  );
}
