import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffa500",
    },
    secondary: {
      main: "#202020",
    },
  },
});

export default defaultTheme;
