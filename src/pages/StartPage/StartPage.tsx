import { useUserContext } from "../../context/UserContext";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Navigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Alert from "../../components/Shared/Alert/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
                    <Alert type="default">
                        <FontAwesomeIcon icon="spinner" spin /> Verificando disponibilidad del servidor.
                        <hr />
                        <p>
                            Esto puede tardar varios minutos, por favor, sea paciente y espere.
                        </p>
                    </Alert>
                </>
            ) : (<>
                {error ? (
                    <>
                        <Alert type="diablo">
                            <FontAwesomeIcon icon="triangle-exclamation" /> <strong>Harry, tenemos un problema!</strong>
                            <hr/>
                            <p>
                                El servidor no esta disponible. Intente en otro momento.
                                <br/>
                                <small>Si el problema persiste, notifique al administrador.</small>
                            </p>
                        </Alert>
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