import React from "react";
import CreateGameForm from "./components/CreateGameForm";
import { useUserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const Admin = () => {
    const { principal } = useUserContext();


    return (
        <>
            {!principal.isAuthenticated && <Navigate to="/" replace={true} />}
            <CreateGameForm />
        </>
    )
}

export default Admin;