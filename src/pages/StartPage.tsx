import React from "react";
import { useUserContext } from "../context/UserContext";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Navigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";


const StartPage = () => {
    const { principal } = useUserContext();

    const { loading, error } = useAxios({
        lazy: false,
        method: "GET",
        url: `/auth/health`,
        data: {}
    });

    return (
        <>
            {loading ? (
                <>
                    <pre>
                        <code><i className="spin">⌛</i> Verificando disponibilidad del servidor ...</code>
                    </pre>
                </>
            ) : (<>
                {error ? (
                    <>
                        <pre>
                            <code>☠️ El servidor no est&aacute; disponible. Vuelva a intentar en otro momento.</code>
                        </pre>
                    </>
                ) : (
                    <>
                        {principal.isAuthenticated ? (
                            <Navigate to="/home" replace={true} />
                        ) : (
                            <>
                                <LoginForm />
                                <SignUpForm />
                            </>
                        )}
                    </>
                )}
            </>
            )}
        </>
    )
}

export default StartPage;