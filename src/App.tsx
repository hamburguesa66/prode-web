import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
