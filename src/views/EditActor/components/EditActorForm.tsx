import {
    Box,
    Button,
    Grid,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
  } from '@mui/material';
  import React, { useState } from 'react';
  import { editActor, useCustomActors } from '../../../hooks/useDatabase';
  
  interface Actor {
    name: string;
    ac: number;
    dc: number;
    hp: number;
    initiative: number;
    notes: string;
    type: string;
    custom: boolean;
  }
  
  const style = {
    box: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    },
    textField: {
      width: '100%',
    },
    select: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
  };
  
  export default function EditActorForm({ open, setOpen, actor, user }) {
    const [editedActor, setEditedActor] = useState<Actor>(actor);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log('New Actor: ', actor);
      editActor(editedActor, user.uid);
      handleClose();
    };
  
    return (
      <div>
        <Modal open={open}>
          <Box sx={style.box}>
            <form onSubmit={handleFormSubmit}>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={10}>
                  <Typography variant="h5">Actor Form</Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    label="Name"
                    defaultValue={editedActor.name}
                    sx={style.textField}
                    onChange={(e) => {
                      let temp = actor;
                      temp.name = e.target.value;
                      setEditedActor(temp);
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    label="ac"
                    type="number"
                    defaultValue={editedActor.ac}
                    sx={style.textField}
                    onChange={(e) => {
                      let temp = actor;
                      temp.ac = parseInt(e.target.value);
                      setEditedActor(temp);
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    label="dc"
                    type="number"
                    defaultValue={editedActor.dc}
                    sx={style.textField}
                    onChange={(e) => {
                      let temp = actor;
                      temp.dc = parseInt(e.target.value);
                      setEditedActor(temp);
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    label="hp"
                    type="number"
                    defaultValue={editedActor.hp}
                    sx={style.textField}
                    onChange={(e) => {
                      let temp = actor;
                      temp.hp = parseInt(e.target.value);
                      setEditedActor(temp);
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    label="Notes"
                    sx={style.textField}
                    defaultValue={editedActor.notes}
                    onChange={(e) => {
                      let temp = actor;
                      temp.notes = e.target.value;
                      setEditedActor(temp);
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Select
                    label="Type"
                    defaultValue={editedActor.type}
                    sx={style.select}
                    onChange={(e) => {
                      let temp = actor;
                      temp.type = e.target.value;
                      setEditedActor(temp);
                    }}
                  >
                    <MenuItem value={'creature'}>Creature</MenuItem>
                    <MenuItem value={'companion'}>Companion</MenuItem>
                    <MenuItem value={'effect'}>Effect</MenuItem>
                    <MenuItem value={'party'}>Party</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={5}>
                  <Button variant="contained" type="submit" sx={style.button}>
                    Add
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    sx={style.button}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
  