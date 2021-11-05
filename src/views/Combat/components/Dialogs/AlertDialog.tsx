import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

export default function AlertDialog({
  title,
  dialog,
  open,
  setOpen,
  continueClicked,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={continueClicked}>
            Continue
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
