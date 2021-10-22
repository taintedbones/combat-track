import { createTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: green[700],
    },
  },
});

export default theme;
