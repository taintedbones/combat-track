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
import { addActor, useCustomActors } from '../../../hooks/useDatabase';

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

export default function ActorForm({ open, setOpen, user }) {
  const { changeMade, setChangeMade} = useCustomActors();
  const [actor, setActor] = useState<Actor>({
    name: '',
    ac: 0,
    dc: 0,
    hp: 0,
    initiative: 0,
    notes: '',
    type: 'creature',
    custom: true,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('New Actor: ', actor);
    if (user !== false) {
      addActor(actor, user.uid);
      changeMade? setChangeMade(false) : setChangeMade(true);
    }
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
                  sx={style.textField}
                  onChange={(e) => {
                    let temp = actor;
                    temp.name = e.target.value;
                    setActor(temp);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  label="ac"
                  type="number"
                  sx={style.textField}
                  onChange={(e) => {
                    let temp = actor;
                    temp.ac = parseInt(e.target.value);
                    setActor(temp);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  label="dc"
                  type="number"
                  sx={style.textField}
                  onChange={(e) => {
                    let temp = actor;
                    temp.dc = parseInt(e.target.value);
                    setActor(temp);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  label="hp"
                  type="number"
                  sx={style.textField}
                  onChange={(e) => {
                    let temp = actor;
                    temp.hp = parseInt(e.target.value);
                    setActor(temp);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label="Notes"
                  sx={style.textField}
                  onChange={(e) => {
                    let temp = actor;
                    temp.notes = e.target.value;
                    setActor(temp);
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <Select
                  label="Type"
                  value={'creature'}
                  sx={style.select}
                  onChange={(e) => {
                    let temp = actor;
                    temp.type = e.target.value;
                    setActor(temp);
                  }}
                >
                  <MenuItem value={'creature'}>Creature</MenuItem>
                  <MenuItem value={'companion'}>Companion</MenuItem>
                  <MenuItem value={'effect'}>Effect</MenuItem>
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
