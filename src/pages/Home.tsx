import React from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";


const Home = () => {
    const { principal, setPrincipal } = useUserContext();
    return (
        <>
            {!principal.isAuthenticated && <Navigate to="/" replace={true} />}
            <div>Home</div>
        </>
    )
}

export default Home;