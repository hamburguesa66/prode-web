import React from "react";
import { useUserContext } from "../context/UserContext";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Navigate } from "react-router-dom";


const StartPage = () => {
    const { principal, setPrincipal } = useUserContext();
    return (
        <>
            {principal.isAuthenticated && <Navigate to="/home" replace={true} />}
            <p><code>debug</code> API URL: {process.env.REACT_APP_API_URL}</p>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <LoginForm />
                        </td>
                        <td>
                            <SignUpForm />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default StartPage;