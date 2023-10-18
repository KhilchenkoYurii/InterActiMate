import { ThemeProvider, createTheme } from "@mui/material";
import "./App.scss";
import { AllRoutes } from "./config/routes/routes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import { store } from "./store";

const theme = createTheme({
  typography: {
    fontFamily: "Jura, sans-serif",
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <ReactNotifications />
          <AllRoutes />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
