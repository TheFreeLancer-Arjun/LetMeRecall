import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6750A4", // Material 3 primary
    },
    secondary: {
      main: "#625B71",
    },
    background: {
      default: "#F8F5FF",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  shape: {
    borderRadius: 12, // Rounded corners like Material 3
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          textTransform: "none",
          padding: "10px 20px",
        },
      },
    },
  },
});

export default theme;
