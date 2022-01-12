import { Button, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "../ThemeProvider";
import d20Img from "./assets/d20s.avif";
import { GiCrossedSwords } from "react-icons/gi";
import "../styles/App.css";

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item container xs={12} md={6} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" style={{ fontFamily: "scurlock" }}>
              DnD Combat Tracker
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" paragraph style={{}}>
              Create and manage combat scenarios for your Dungeons & Dragons
              games
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to="/combat">
              <Button variant="contained">
                <Typography variant="h4" style={{ fontFamily: "scurlock" }}>
                  <GiCrossedSwords style={{position: "relative", top: "5px"}} />
                  {" Start Combat "}
                  <GiCrossedSwords style={{position: "relative", top: "5px"}} />
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            style={{
              width: "100%",
              height: "100%",
              minHeight: "250px",
              backgroundImage:
                "radial-gradient(transparent, transparent, #3F403F 73%), url(" +
                d20Img +
                ")",
              backgroundSize: "100% auto",
              backgroundPosition: "center",
            }}
          ></Box>
        </Grid>
      </Grid>
    </div>
  );
}
