import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeaturedGamePanel from "./components/FeaturedGamePanel/FeaturedGamePanel";

const HomePage = () => {
    
    const { principal } = useUserContext();

    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2><FontAwesomeIcon icon="house-flag" /> Home</h2>

                    <FeaturedGamePanel
                        title="Partidos ofrecidos"
                        icon="dice"
                        sortOrder="ASC"
                        state="NOT_STARTED" />

                    <FeaturedGamePanel
                        title="En juego"
                        icon="radio"
                        sortOrder="ASC"
                        state="IN_PROGRESS" />

                    <FeaturedGamePanel
                        title="Finalizados"
                        icon="check-double"
                        sortOrder="DESC"
                        state="DONE" />
                </>
            )}
        </>
    )
}

export default HomePage;