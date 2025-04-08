import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AppRouter from './routers/AppRouter';
import './App.css';

function App() {
  const { fetchUser } = useAuthStore();

  // Check for existing authentication when app loads
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;