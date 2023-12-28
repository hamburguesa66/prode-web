import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Login from "../pages/Login";
import Ranking from "../pages/Ranking";
import Admin from "../pages/Admin";
import StartPage from "../pages/StartPage";
import Home from "../pages/Home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
        {
        //<RedirectHandler>
        }
        <Header />

        <Routes>
          <Route path="/" Component={StartPage} />
          <Route path="/home" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/ranking" Component={Ranking} />
          <Route path="/admin" Component={Admin} />
        </Routes>
        {
        //</RedirectHandler>
        }
    </BrowserRouter>
  );
};
