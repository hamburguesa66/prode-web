import React from "react";
import CreateGameForm from "./components/CreateGameForm";
import { useUserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import AdminUserTable from "./components/AdminUserTable";
import AdminGameTable from "./components/AdminGameTable";

const Admin = () => {
    const { principal } = useUserContext();


    return (
        <>
            {!principal.isAuthenticated && <Navigate to="/" replace={true} />}
            <h2>🛠️ Administraci&oacute;n</h2>
            <AdminGameTable />
            <CreateGameForm />
            <AdminUserTable />
        </>
    )
}

export default Admin;