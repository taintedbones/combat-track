import { Grid, Typography } from '@mui/material';
import DataTable from '../../components/DataTables/ActorsDataTable';
import ActorToolbar from './components/ActorToolbar';
import { useStyles } from '../../ThemeProvider';
import AddActorForm from './components/AddActorForm';
import EditActorForm from './components/EditActorForm';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useCustomActors, deleteActor } from '../../hooks/useDatabase';
import { GridRowParams, MuiEvent, GridCallbackDetails } from '@mui/x-data-grid';

export default function EditActors() {
  console.log('Rerender: EditActors()');
  const classes = useStyles();
  const { user } = useAuth();
  const { error, loading, customActors } = useCustomActors();
  const [selectedActor, setSelectedActor] = useState<any>();
  const [addTriggered, setAddTriggered] = useState<boolean>(false);
  const [editTriggered, setEditTriggered] = useState<boolean>(false);

  const handleAddClicked = () => {
    setAddTriggered(true);
  };

  const handleEditClicked = () => {
    console.log('edit clicked');
    setEditTriggered(true);
  };

  const handleDeleteClicked = () => {
    if (user !== false) {
      deleteActor(selectedActor, user.uid);
    }
  };

  const handleSelectActor = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
    details: GridCallbackDetails
  ) => {
    setSelectedActor(params.row);
    console.log('Selected actor: ', params.row);
  };

  const renderAddActorForm = (
    <React.Fragment>
      <AddActorForm open={addTriggered} setOpen={setAddTriggered} user={user} />
    </React.Fragment>
  );

  const renderEditActorForm = (
    <React.Fragment>
      <EditActorForm
        open={editTriggered}
        setOpen={setEditTriggered}
        actor={selectedActor}
      />
    </React.Fragment>
  );

  useEffect(() => {
    console.log('EditActors -> useEffect()');
  }, [user, customActors]); // useEffect for combat events

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" direction="row" spacing={2}>
        <Typography variant="h4">Actor Editor</Typography>
        <Grid item xs={12}>
          <DataTable
            classes={classes}
            actors={customActors}
            loading={loading}
            onSelect={handleSelectActor}
          />
        </Grid>
        <ActorToolbar
          onAddClicked={handleAddClicked}
          onDeleteClicked={handleDeleteClicked}
          onEditClicked={handleEditClicked}
        />
        {addTriggered && renderAddActorForm}
        {editTriggered && renderEditActorForm}
      </Grid>
    </div>
  );
}
