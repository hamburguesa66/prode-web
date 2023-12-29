import React from 'react';
import './App.css';
import { UserProvider } from './context/UserContext';
import { AppRouter } from './components/AppRouter';

function App() {
  return (
    <>
      <UserProvider>
        <AppRouter></AppRouter>
      </UserProvider>
    </>
  );
}

export default App;
