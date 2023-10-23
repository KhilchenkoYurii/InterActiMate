import { ThemeProvider, createTheme } from "@mui/material";
import "./App.scss";
import { AllRoutes } from "./config/routes/routes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { sendMessage } from "./store/chat/chat.action";
import { socket } from "./socket";

const theme = createTheme({
  typography: {
    fontFamily: "Jura, sans-serif",
  },
});

const ChatProvider = ({ children }: any) => {
  const dispatch = useDispatch();

  socket.on('receive_message', (receivedMessage: any) => {
    dispatch(sendMessage({ chatId: receivedMessage.chatId, body: receivedMessage.message, sender: receivedMessage?.userId || '0' }));
  });

  socket.on('previous_messages', () => {
    // TODO:
  });

  return (
    <div className="App">
      {children}
    </div>
  );
};

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ChatProvider>
          <ReactNotifications />
          <AllRoutes />
        </ChatProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
