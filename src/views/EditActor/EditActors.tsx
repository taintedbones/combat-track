import { Grid, Typography } from "@mui/material";
import DataTable from "../../components/DataTables/ActorsDataTable";
import ActorToolbar from "./components/ActorToolbar";
import { useStyles } from "../../ThemeProvider";
import AddActorForm from "./components/AddActorForm";
import EditActorForm from "./components/EditActorForm";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useCustomActors, deleteActor } from "../../hooks/useDatabase";
import AlertDialog from "../Combat/components/Dialogs/AlertDialog";
import { GridRowParams, MuiEvent, GridCallbackDetails } from "@mui/x-data-grid";
import LoginMessage from "../../components/LoginMessage";

export default function EditActors() {
  console.log("Rerender: EditActors()");
  const classes = useStyles();
  const { user } = useAuth();
  const { loading, customActors, changeMade, setChangeMade } = useCustomActors();
  const [selectedActor, setSelectedActor] = useState<any>(undefined);
  const [addTriggered, setAddTriggered] = useState<boolean>(false);
  const [editTriggered, setEditTriggered] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [alertTriggered, setAlertTriggered] = useState<boolean>(false);
  const [refresh, setRefresh] = useState(0);

  const handleAddClicked = () => {
    setAddTriggered(true);
  };

  const handleEditClicked = () => {
    console.log("edit clicked");
    setEditTriggered(true);
  };

  const handleDeleteClicked = () => {
    setAlertTriggered(true);
  };

  const handleDeleteActor = () => {
    if (user !== false) {
      deleteActor(selectedActor, user.uid);
    }
    setAlertTriggered(false);
    setRefresh(refresh + 1);
    changeMade? setChangeMade(false) : setChangeMade(true);
  };

  const handleSelectActor = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
    details: GridCallbackDetails
  ) => {
    if (selectedActor === undefined) {
      setSelectedActor(params.row);
      setButtonDisabled(false);
    } else if (params.id === selectedActor.id) {
      setSelectedActor(undefined);
      setButtonDisabled(true);
    } else {
      setSelectedActor(params.row);
    }
  };

  const renderAddActorForm = (
    <React.Fragment>
      <AddActorForm open={addTriggered} setOpen={setAddTriggered} user={user} />
    </React.Fragment>
  );

  const renderEditActorForm = (
    <React.Fragment>
      <EditActorForm open={editTriggered} setOpen={setEditTriggered} actor={selectedActor} user={user} />
    </React.Fragment>
  );

  const renderAlert = (
    <React.Fragment>
      <AlertDialog
        title="Confirm Delete"
        dialog="Are you sure you want to delete this actor?"
        open={alertTriggered}
        setOpen={setAlertTriggered}
        continueClicked={handleDeleteActor}
      />
    </React.Fragment>
  );

  useEffect(() => {
    console.log("EditActors -> useEffect()");
  }, [user, customActors, buttonDisabled, refresh]); // useEffect for combat events

  return (
    <div className={classes.root}>
      {user ? (
        <Grid container justifyContent="center" direction="row" spacing={2}>
          <Typography variant="h4">Actor Editor</Typography>
          <Grid item xs={12}>
            <DataTable
              classes={classes}
              actors={customActors}
              loading={loading}
              onSelect={handleSelectActor}
              selected={selectedActor}
            />
          </Grid>
          <ActorToolbar
            onAddClicked={handleAddClicked}
            onDeleteClicked={handleDeleteClicked}
            onEditClicked={handleEditClicked}
            isDisabled={buttonDisabled}
          />
          {addTriggered && renderAddActorForm}
          {editTriggered && renderEditActorForm}
          {alertTriggered && renderAlert}
        </Grid>
      ) : (
        <LoginMessage isActors={true} />
      )}
    </div>
  );
}
