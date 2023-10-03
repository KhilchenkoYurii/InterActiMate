import { ThemeProvider, createTheme } from "@mui/material";
import "./App.scss";
import { AllRoutes } from "./config/routes/routes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const theme = createTheme({
  typography: {
    fontFamily: "Jura, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ReactNotifications />
        <AllRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
