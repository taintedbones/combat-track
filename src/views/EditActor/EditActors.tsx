import { Grid, Typography } from "@mui/material";
import DataTable from "../../components/DataTables/ActorsDataTable";
import ActorToolbar from "./components/ActorToolbar";
import { useStyles } from "../../ThemeProvider";

export default function EditActors() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" direction="row" spacing={2}>
        <Typography variant="h4">Actor Editor</Typography>
        <Grid item xs={12}>
          <DataTable classes={classes} />
        </Grid>
        <ActorToolbar />
      </Grid>
    </div>
  );
}
