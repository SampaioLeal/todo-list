import { createMuiTheme } from "@material-ui/core";

export const lightTheme = createMuiTheme({
  typography: {
    allVariants: {
      color: "#000000",
    },
  },
  palette: {
    text: {
      primary: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    primary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    action: {
      active: "#000000",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export const darkTheme = createMuiTheme({
  typography: {
    allVariants: {
      color: "#ffffff",
    },
  },
  palette: {
    text: {
      primary: "#ffffff",
    },
    background: {
      default: "#282A36",
      paper: "#38394B",
    },
    primary: {
      main: "#5CCD5A",
      contrastText: "#282A36",
    },
    action: {
      active: "#ffffff",
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
