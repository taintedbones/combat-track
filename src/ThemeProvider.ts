import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

/**
 * @dev feel free to make your own color scheme here
 */

const theme = createTheme({
  palette: {
    background: {
      default: "#3F403F",
      paper: "#E6E8E6",
    },
    primary: {
      main: "#9FB8AD",
      light: "#9FB8AD",
      dark: "#9FB8AD",
    },
    secondary: {
      main: "#475841",
      light: "#475841",
      dark: "#343833",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#CED0CE",
      light: "#CED0CE",
      dark: "#CED0CE",
    },
    warning: {
      main: "#CC0000",
      light: "#CC0000",
      dark: "#CC0000",
    },
  },
});

export const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: `${theme.palette.background.default}`,
      textAlign: "center",
      minHeight: "calc(100vh - 100px)",
      padding: "100px 5% 0% 5%",
      color: `${theme.palette.background.paper}`,
      display: "flex",
      flexDirection: "column",
    },
    container: {
      width: "100%",
      height: "60vh",
      marginBottom: "5vh",
    },
    dataGrid: {
      backgroundColor: `${theme.palette.secondary.dark}`,
      color: "white",
      width: "100%",
      height: "60vh",
      "& .col-header": {
        backgroundColor: `${theme.palette.secondary.light}`,
      },
      "& .rowTheme-selected-true": {
        backgroundColor: `${theme.palette.primary.light}`,
        color: `${theme.palette.warning.light}`,
        fontWeight: "bold",
      },
    },
    grid: {
      height: "80%",
    },
  };
});

export default theme;
