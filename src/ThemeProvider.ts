import { createTheme } from "@mui/material";
import { orange, grey } from "@mui/material/colors";

/**
 * @dev feel free to make your own color scheme here
 */

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: orange[700],
    },
  },
});

export default theme;
