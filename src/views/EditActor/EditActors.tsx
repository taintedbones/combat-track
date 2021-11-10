import { Grid, Typography } from "@mui/material";
import DataTable from "../../components/DataTables/ActorsDataTable";
import ActorToolbar from "./components/ActorToolbar";
import { useStyles } from "../../ThemeProvider";
import ActorForm from "./components/ActorForm";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useCustomActors } from "../../hooks/useDatabase";

export default function EditActors() {
  const classes = useStyles();
  const [addTriggered, setAddTriggered] = useState<boolean>(false);

  const handleAddClicked = () => {
    setAddTriggered(true);
  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" direction="row" spacing={2}>
        <Typography variant="h4">Actor Editor</Typography>
        <Grid item xs={12}>
          <DataTable classes={classes} />
        </Grid>
        <ActorToolbar onAddClicked={handleAddClicked} />
        {addTriggered && <ActorForm open={addTriggered} setOpen={setAddTriggered} />}
      </Grid>
    </div>
  );
}
