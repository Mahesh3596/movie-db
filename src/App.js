import './App.css';
import { AppContextProvider } from './contexts/AppContext';
import LandingPage from './pages/LandingPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <LandingPage/>
      </Router>
    </AppContextProvider>
  );
}

export default App;
