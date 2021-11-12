import { Typography, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useAuth from "../hooks/useAuth";
import { checkUserExists, addUser } from "../hooks/useDatabase";

const useStyles = makeStyles(() => {
  return {
    message: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function LoginMessage({ isActors }) {
  const classes = useStyles();
  const { signin } = useAuth();

  const login = async () => {
    try {
      const user = await signin();
      const exists = (await checkUserExists(user.uid)).valueOf();
      if (!exists) {
        addUser(user);
        console.log(user.displayName, " was successfully added to users!");
      }
    } catch (error) {
      console.error("There was an error logging into your google account. Try again.");
    }
  };

  return (
    <div className={classes.message}>
      <Grid container justifyContent="center" direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">{`Please log in to access your custom ${
            isActors ? `actors` : `scenarios`
          }`}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
