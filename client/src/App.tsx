import { ThemeProvider, createTheme } from "@mui/material";
import "./App.scss";
import { AllRoutes } from "./config/routes/routes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { socket } from "./socket";

const theme = createTheme({
  typography: {
    fontFamily: "Jura, sans-serif",
  },
});

function App() {
  // TODO:
  socket.on('connect', () => {
    console.log('CONNECTED!');
  });

  socket.on('receive_message', (messages) => {
    console.log('message received::', messages);
  });

  socket.on('previous_messages', (messages) => {
    console.log('previous messages::', messages);
  });

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
