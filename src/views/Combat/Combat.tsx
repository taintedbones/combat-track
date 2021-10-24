import { Grid } from "@mui/material";
import Toolbar from "./components/Toolbar";

import logo from "../../styles/logo.svg";
import "../../styles/App.css";

export default function Combat() {
  return (
    <div className="container">
      <Grid container justifyContent="center">
        {/**
         * @dev Combat table component goes here
         */}
        <Grid item>
          <img src={logo} className="App-logo" alt="logo" />
        </Grid>
        <Toolbar />
      </Grid>
    </div>
  );
}
