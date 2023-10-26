import './App.css';
import { AppContextProvider } from './contexts/AppContext';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <AppContextProvider>
      <LandingPage/>
    </AppContextProvider>
  );
}

export default App;
