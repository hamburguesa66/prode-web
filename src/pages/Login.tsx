import React from "react";
import { Principal, useUserContext } from "../context/UserContext";

const Login = () => {
    const { principal, setPrincipal } = useUserContext();
    
    return (
        <>
            <div>Login</div>
            <button onClick={() => setPrincipal({
                isAuthenticated: true,
                username: "hamburguesa66",
                isAdmin: true
            })}>Login</button>
            <button onClick={() => setPrincipal(new Principal())}>Logout</button>
        </>
    )
}

export default Login;