import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import AdminPage from "../pages/AdminPage/AdminPage";
import StartPage from "../pages/StartPage/StartPage";
import RankingPage from "../pages/RankingPage/RankingPage";
import { Toaster } from "react-hot-toast";
import HomePage from "../pages/HomePage/components/HomePage";
import ArchivePage from "../pages/ArchivePage/ArchivePage";
import RulesetPage from "../pages/RulesetPage/RulesetPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div><Toaster /></div>
      <Header />
      <Routes>
        <Route path="/" Component={StartPage} />
        <Route path="/home" Component={HomePage} />
        <Route path="/ranking" Component={RankingPage} />
        <Route path="/archive" Component={ArchivePage} />
        <Route path="/admin" Component={AdminPage} />
        <Route path="/rules" Component={RulesetPage} />
      </Routes>
    </BrowserRouter>
  );
};
