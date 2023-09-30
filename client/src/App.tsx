import './App.scss';
import { AllRoutes } from './config/routes/routes';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReactNotifications />
        <AllRoutes />
      </Provider>
    </div>
  );
}

export default App;
