import React from "react";
import { useUserContext } from "../context/UserContext";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Navigate } from "react-router-dom";


const StartPage = () => {
    const { principal } = useUserContext();
    return (
        <>
            {principal.isAuthenticated && <Navigate to="/home" replace={true} />}
            <LoginForm />
            <SignUpForm />
        </>
    )
}

export default StartPage;