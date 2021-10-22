import { useState } from "react";
import { Box, AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box>
        <AppBar className="navbar" position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit" onClick={handleOpen}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <LoginModal open={open} handleClose={handleClose} />
    </>
  );
}
