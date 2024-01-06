import React from "react";
import CreateGameForm from "./components/CreateGameForm";
import { useUserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import AdminUserTable from "./components/AdminUserTable";

const Admin = () => {
    const { principal } = useUserContext();


    return (
        <>
            {!principal.isAuthenticated && <Navigate to="/" replace={true} />}
            <CreateGameForm />
            <AdminUserTable />
        </>
    )
}

export default Admin;