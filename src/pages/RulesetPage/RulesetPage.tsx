import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Ruleset from "../../components/Shared/Ruleset";
import Jumbotron from "../../components/Shared/Jumbotron/Jumbotron";
import Alert from "../../components/Shared/Alert/Alert";

const RulesetPage = () => {
    const { principal } = useUserContext();
    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <Jumbotron icon="book-skull" title="Reglamento" />
                    <Ruleset />
                </>
            )}
        </>
    )
}

export default RulesetPage;