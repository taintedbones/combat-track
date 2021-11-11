import { useState } from "react";
import { Box, AppBar, Toolbar, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from "./components/Menu";
import { checkUserExists, addUser } from "../../hooks/useDatabase";

import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signin, signout } = useAuth();

  // callback to authenticate user
  const login = async () => {
    try {
      const user = await signin();
      const exists = (await checkUserExists(user.uid)).valueOf();
      if(!exists){
        addUser(user);
        console.log(user.displayName, " was successfully added to users!");
      }
    } catch (error) {
      console.error("There was an error logging into your google account. Try again.");
    }
  };

  const logout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error("There was an error logging out of your google account. Try again.");
    }
  };

  return (
    <>
      <Box>
        <AppBar
          className="navbar"
          position="fixed"
          sx={{ backgroundColor: `${theme.palette.secondary.light}`, color: `${theme.palette.secondary.contrastText}` }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DnD Tracker
            </Typography>

            {user ? (
              <>
                <Typography variant="h6" component="div" sx={{ mr: 4 }}>
                  {user.isAnonymous ? `Guest` : `${user.displayName}`}
                </Typography>
                <Button variant="contained" color="primary" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={login}>
                Login
              </Button>
            )}

            <IconButton
              size="large"
              edge="start"
              color="primary"
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
      {/* <LoginModal open={modalOpen} handleClose={() => setModalOpen(false)} /> */}
    </>
  );
}
