import './App.scss';
import { AllRoutes } from './config/routes/routes';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <AllRoutes />
    </div>
  );
}

export default App;
