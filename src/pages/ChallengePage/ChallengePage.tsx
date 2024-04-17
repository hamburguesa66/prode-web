import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import SearchableChallengeTable from "../../components/Shared/SearchableChallengeTable/SearchableChallengeTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChallengePage = () => {
    const { principal } = useUserContext();
    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2><FontAwesomeIcon icon="hourglass" /> Desafios</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <SearchableChallengeTable />
                </>
            )}
        </>
    )
}

export default ChallengePage;