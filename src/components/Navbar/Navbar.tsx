import { useState } from "react";
import { Box, AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from "./components/Menu";
import LoginModal from "../LoginModal";

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Box>
        <AppBar className="navbar" position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DnD Tracker
            </Typography>
            <Button color="inherit" onClick={() => setModalOpen(true)}>
              Login
            </Button>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 2 }}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu isOpen={menuOpen} handleClose={() => setMenuOpen(false)} />
      <LoginModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </>
  );
}
