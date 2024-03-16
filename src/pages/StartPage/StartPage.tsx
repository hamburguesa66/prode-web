import './StartPage.css';

import loadingImg from "./../../assets/football.gif";
import bannerImg from "./../../assets/champions.jpg";

import { useUserContext } from "../../context/UserContext";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { Navigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Alert from "../../components/Shared/Alert/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "../../hooks/useMediaQuery";


const StartPage = () => {
    const { principal } = useUserContext();

    const isDesktop = useMediaQuery('(min-width: 960px)');

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
                    <div id="start-page-loading-gif" className="flex-container flex-skeleton-a">
                        <div className="half-width">
                            <img src={loadingImg} />
                        </div>
                        <div className="half-width text-center">
                            Comprobando disponibilidad del servidor
                            <p>
                                <small>
                                    Puede tardar entre 5 y 10 minutos. Es un servicio gratuito. No hay plata, es lo que hay. Asique no te quejes.
                                </small>
                            </p>
                        </div>
                    </div>
                </>
            ) : (<>
                {error ? (
                    <>
                        <Alert type="diablo">
                            <FontAwesomeIcon icon="triangle-exclamation" /> <strong>Harry, tenemos un problema!</strong>
                            <hr />
                            <p>
                                El servidor no esta disponible. Intente en otro momento.
                                <br />
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
                                {isDesktop ? (
                                    <>
                                        <div id="start-page-desktop" className="flex-container">
                                            <div>
                                                <img src={bannerImg} />
                                            </div>
                                            <div>
                                                <LoginForm />
                                                <SignUpForm />
                                            </div>
                                        </div>
                                    </>
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
            )}
        </>
    )
}

export default StartPage;