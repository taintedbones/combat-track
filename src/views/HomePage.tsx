import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "70px 20px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2">DnD Combat Tracker</Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to="/combat">
            <Button variant="contained">Start Combat!</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
