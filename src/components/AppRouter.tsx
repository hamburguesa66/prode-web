import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import AdminPage from "../pages/AdminPage/AdminPage";
import StartPage from "../pages/StartPage/StartPage";
import RankingPage from "../pages/RankingPage/RankingPage";
import { Toaster } from "react-hot-toast";
import HomePage from "../pages/HomePage/HomePage";
import ArchivePage from "../pages/ArchivePage/ArchivePage";
import RulesetPage from "../pages/RulesetPage/RulesetPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import ChallengePage from "../pages/ChallengePage/ChallengePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "calc(100vh - 110px)", marginBottom: "24px" }}>
        <div><Toaster /></div>
        <Header />
        <Routes>
          <Route path="/" Component={StartPage} />
          <Route path="/home" Component={HomePage} />
          <Route path="/ranking" Component={RankingPage} />
          <Route path="/archive" Component={ArchivePage} />
          <Route path="/admin" Component={AdminPage} />
          <Route path="/rules" Component={RulesetPage} />
          <Route path="/challenges" Component={ChallengePage} />
        </Routes>
      </div>
      <footer style={{ border: "none", textAlign: "center" }}>
        <small>
          <FontAwesomeIcon icon="copyright" /> 2023-{dayjs().year()} <a href="https://github.com/hamburguesa66">@hamburguesa66</a>
        </small>
      </footer>
    </BrowserRouter>
  );
};
