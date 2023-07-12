import './App.scss';
import { AllRoutes } from './config/routes/routes';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppFooter } from './components/AppFooter/AppFooter';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="app-content">
        <AllRoutes />
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
