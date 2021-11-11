import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Typography,
} from "@mui/material";
import { useActors } from "../../../../hooks/useDatabase";

export default function ConfirmationDialog({ open, setOpen, onClose }) {
  const { actors } = useActors();

  const handleListItemClick = (value: any) => {
    onClose(value);
    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} fullWidth={true} maxWidth={"xs"} scroll="paper">
        <DialogTitle>
          <Typography>Select Actor</Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem autoFocus button onClick={() => handleListItemClick("custom")}>
              <ListItemText>Custom</ListItemText>
            </ListItem>
            {actors.map((actor) => (
              <ListItem button onClick={() => handleListItemClick(actor)} key={actor.name}>
                <ListItemText primary={actor.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleButtonClick}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
