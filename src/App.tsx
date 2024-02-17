import React from 'react';
import './App.css';
import { UserProvider } from './context/UserContext';
import { AppRouter } from './components/AppRouter';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

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
