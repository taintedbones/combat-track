import { Grid, Typography } from "@mui/material";
import DataTable from "../../components/DataTables/ScenariosDataTable";
import ScenarioToolbar from "./components/ScenarioToolbar";
import "../../styles/App.css";

export default function EditActors() {
  return (
    <div className="container">
      <Grid container justifyContent="center" direction="row" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Scenario Editor</Typography>
        </Grid>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
        <ScenarioToolbar />
      </Grid>
    </div>
  );
}
