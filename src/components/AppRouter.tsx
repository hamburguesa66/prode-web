import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Ranking from "../pages/Ranking";
import AdminPage from "../pages/AdminPage/AdminPage";
import StartPage from "../pages/StartPage";
import Home from "../pages/Home";
import ProfilePage from "../pages/ProfilePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={StartPage} />
          <Route path="/home" Component={Home} />
          <Route path="/ranking" Component={Ranking} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/admin" Component={AdminPage} />
        </Routes>
    </BrowserRouter>
  );
};
