import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Ranking = () => {
    const { principal, setPrincipal } = useUserContext();

    if(!principal.isAuthenticated) {
        
    }

    return (
        <>
            {!principal.isAuthenticated && <Navigate to="/" replace={true} />}
            <h2>🏆 Ranking</h2>
            <pre>
                <code>🚧 En construcci&oacute;n</code>
            </pre>
        </>
    )
}

export default Ranking;