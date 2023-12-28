import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Ranking = () => {
    const { principal, setPrincipal } = useUserContext();

    if(!principal.isAuthenticated) {
        
    }

    return (
        <>
            {!principal.isAuthenticated && <Navigate to="/" replace={true} />}
            <div>Ranking</div>
        </>
    )
}

export default Ranking;