import { Grid, Typography } from "@mui/material";
import DataTable from "../../components/DataTables/CombatDataTable";
import ActorToolbar from "./components/ActorToolbar";
import "../../styles/App.css";

export default function EditActors() {
  return (
    <div className="container">
      <Grid container justifyContent="center" direction="row" spacing={2}>
        <Typography variant="h4">Actor Editor</Typography>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
        <ActorToolbar />
      </Grid>
    </div>
  );
}
