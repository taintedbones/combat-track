import { useState } from "react";
import { Button, Typography, Grid, Tooltip } from "@mui/material";
import AlertDialog from "../Dialogs/AlertDialog";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";

export default function CombatToolbar({
  onBackClicked,
  currentTurnName,
  roundNum,
  turnIndex,
  endTurn,
  onAddActor,
  onDeleteActor,
  isValidCombat,
}) {
  const [backDialogOpen, setBackDialogOpen] = useState(false);
  const [actorDialogOpen, setActorDialogOpen] = useState(false);

  return (
    <>
      <Grid item container>
        <Grid item container spacing={4}>
          <Grid item container spacing={4}>
            <Grid container item xs={2} textAlign="start">
              <Typography variant="h5">Current Turn:</Typography>
            </Grid>
            <Grid container item xs={2} textAlign="start">
              <Typography variant="h5">{`${currentTurnName}`}</Typography>
            </Grid>
            <Grid container item xs justifyContent="flex-end">
              <Typography variant="h5">{`Round: ${roundNum}`}</Typography>
            </Grid>
          </Grid>
          <Grid item xs>
            <Button variant="contained" fullWidth onClick={() => setBackDialogOpen(true)}>
              Back
            </Button>
          </Grid>
          <Grid item xs>
            {turnIndex === 0 ? (
              <Button variant="contained" fullWidth onClick={() => setActorDialogOpen(true)}>
                Add Actor
              </Button>
            ) : (
              <Tooltip title="You may only add actors ad the beginning of the round." placement="top">
                <span>
                  <Button variant="contained" fullWidth disabled>
                    Add Actor
                  </Button>
                </span>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs>
            <Button variant="contained" fullWidth onClick={onDeleteActor}>
              Delete Actor
            </Button>
          </Grid>
          <Grid item xs>
            {isValidCombat ? (
              <Button variant="contained" color="secondary" fullWidth onClick={endTurn}>
                End Turn
              </Button>
            ) : (
              <Tooltip title="All actors must have an initiative greater than 0." placement="top">
                <span>
                  <Button variant="contained" color="secondary" fullWidth disabled>
                    End Turn
                  </Button>
                </span>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Grid>
      <AlertDialog
        title="Warning"
        dialog="You will lose combat. Do you want to proceed?"
        open={backDialogOpen}
        setOpen={setBackDialogOpen}
        continueClicked={onBackClicked}
      />
      <ConfirmationDialog open={actorDialogOpen} setOpen={setActorDialogOpen} onClose={onAddActor} />
    </>
  );
}
