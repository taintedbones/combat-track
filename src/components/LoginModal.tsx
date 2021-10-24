import * as React from "react";
import { Box, Typography, Modal, Divider, TextField, Button, Link } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: "30px 20px 20px 20px",
};

export default function LoginModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <Divider sx={{ mt: 1 }} />
        <Typography variant="h6" component="h4" sx={{ mt: 2, mb: 1 }}>
          Username
        </Typography>
        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth />
        <Typography variant="h6" component="h4" sx={{ mt: 2, mb: 1 }}>
          Password
        </Typography>
        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" fullWidth />
        <Link
          href="#"
          underline="hover"
          onClick={() => {
            console.log("as guest");
          }}
        >
          <Typography sx={{ mt: 2, color: "#3369ba" }}>Continue as guest</Typography>
        </Link>
        <Link
          href="#"
          underline="hover"
          onClick={() => {
            console.log("as guest");
          }}
        >
          <Typography sx={{ mt: 0, color: "#3369ba" }}>Create an account</Typography>
        </Link>
        <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleClose}>
          Login
        </Button>
      </Box>
    </Modal>
  );
}
