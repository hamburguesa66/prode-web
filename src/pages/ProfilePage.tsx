import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProfilePage = () => {
    const { principal } = useUserContext();

    return (
        <>
            {!principal.isAuthenticated ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2>👤 Mi usuario</h2>
                    <pre>
                        <code>🚧 En construcci&oacute;n</code>
                    </pre>
                </>
            )}
        </>
    )
}

export default ProfilePage;