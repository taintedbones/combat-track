import { useState } from "react";
import { Box, AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from "./components/Menu";
import LoginModal from "../LoginModal";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // callback to authenticate user
  const authenticate = async () => {
    try {
      await console.log("valid credentials");
      setLoggedIn(true);
      setModalOpen(false);
    } catch (error) {
      //catch error and display return message in the modal
      await console.log("invalid credentials");
    }
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <Box>
        <AppBar className="navbar" position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DnD Tracker
            </Typography>

            {loggedIn ? (
              <>
                <Typography variant="h6" component="div" sx={{ paddingRight: "10px" }}>
                  {`<USERNAME>`}
                </Typography>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => setModalOpen(true)}>
                Login
              </Button>
            )}

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
      <LoginModal open={modalOpen} login={authenticate} handleClose={() => setModalOpen(false)} />
    </>
  );
}
