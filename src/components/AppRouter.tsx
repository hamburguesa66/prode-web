import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import AdminPage from "../pages/AdminPage/AdminPage";
import StartPage from "../pages/StartPage";
import Home from "../pages/Home";
import ProfilePage from "../pages/ProfilePage";
import RankingPage from "../pages/RankingPage/RankingPage";
import { Toaster } from "react-hot-toast";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div><Toaster /></div>
      <Header />
      <Routes>
        <Route path="/" Component={StartPage} />
        <Route path="/home" Component={Home} />
        <Route path="/ranking" Component={RankingPage} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/admin" Component={AdminPage} />
      </Routes>
    </BrowserRouter>
  );
};
