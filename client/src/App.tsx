import { ThemeProvider, createTheme } from "@mui/material";
import "./App.scss";
import { AllRoutes } from "./config/routes/routes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { socket } from "./socket";
import { sendMessage } from "./store/chat/chat.action";

const theme = createTheme({
  typography: {
    fontFamily: "Jura, sans-serif",
  },
});

function App() {
  const dispatch = useDispatch();

  socket.on('receive_message', (receivedMessage) => {
    dispatch(sendMessage({ body: receivedMessage.message, sender: receivedMessage?.userId || '0' }));
  });

  socket.on('previous_messages', () => {
    // TODO:
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
