import { useState } from "react";
import { Box, AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from "./components/Menu";
// import LoginModal from "../LoginModal";

import useAuth from "../../hooks/useAuth";
import { User } from "@firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | false>(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { signin, signinAnon, signout } = useAuth();

  // callback to authenticate user
  const login = async () => {
    try {
      const user = await signin();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.error("There was an error logging into your google account. Try again.");
    }
  };

  const logout = async () => {
    try {
      await signout();
      setUser(false);
    } catch (error) {
      console.error("There was an error logging out of your google account. Try again.");
    }
  };

  return (
    <>
      <Box>
        <AppBar className="navbar" position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DnD Tracker
            </Typography>

            {user ? (
              <>
                <Typography variant="h6" component="div" sx={{ mr: 4 }}>
                  {user.isAnonymous ? `Guest` : `${user.displayName}`}
                </Typography>
                <Button variant="contained" color="info" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="contained" color="info" onClick={login}>
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
      {/* <LoginModal open={modalOpen} handleClose={() => setModalOpen(false)} /> */}
    </>
  );
}
