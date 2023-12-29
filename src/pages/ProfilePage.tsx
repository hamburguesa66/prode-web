import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProfilePage = () => {
    const { principal } = useUserContext();

    return (
        <>
            {!principal.isAuthenticated && <Navigate to="/" replace={true} />}
            <div>ProfilePage</div>
        </>
    )
}

export default ProfilePage;