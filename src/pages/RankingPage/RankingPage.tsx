import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankingByCompetition from "./components/RankingByCompetition/RankingByCompetition";
import GeneralRanking from "./components/GeneralRanking";

const RankingPage = () => {
    const { principal } = useUserContext();

    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2><FontAwesomeIcon icon="ranking-star" /> Ranking</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in diam quis tortor semper lacinia tempor in diam. Integer est nisl, tincidunt in elit fringilla, iaculis fermentum ligula. Suspendisse potenti. Vivamus eu accumsan ex. Nullam sodales neque non lorem pellentesque eleifend. In nec turpis non urna pretium euismod eget sit amet risus. Aliquam suscipit vitae quam quis egestas.</p>
                    <GeneralRanking />
                    <RankingByCompetition />
                </>
            )}
        </>
    )
}

export default RankingPage;