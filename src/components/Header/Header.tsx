import React from "react";
import './Header.css';
import { Principal, useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const { principal, setPrincipal } = useUserContext();
    const navigate = useNavigate();

    const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setPrincipal(new Principal());
        navigate("/");
    }

    const goTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, to: string) => {
        e.preventDefault();
        navigate(to);
    }

    return (
        <header style={{ borderBottom: "1px solid #dbdbdb" }}>
            <h1>
                <FontAwesomeIcon icon="futbol" style={{ marginRight: '0.5rem' }} />
                <FontAwesomeIcon icon="p" style={{ marginRight: '0.1rem' }} />
                <FontAwesomeIcon icon="r" style={{ marginRight: '0.1rem' }} />
                <FontAwesomeIcon icon="o" style={{ marginRight: '0.1rem' }} />
                <FontAwesomeIcon icon="d" style={{ marginRight: '0.1rem' }} />
                <FontAwesomeIcon icon="e" />
            </h1>
            {
                principal.isAuthenticated &&
                <>
                    <p>Hola, {principal.username}</p>
                    <nav>
                        <ul>
                            <li><a href="" onClick={(e) => goTo(e, "/home")}>🏠 Home</a></li>
                            <li><a href="" onClick={(e) => goTo(e, "/ranking")}>🏆 Ranking</a></li>
                            <li><a href="" onClick={(e) => goTo(e, "/archive")}>🗃️ Archivo</a></li>
                            {
                                principal.isAdmin && <li><a href="" onClick={(e) => goTo(e, "/admin")}>🛠️ Administraci&oacute;n</a></li>
                            }
                            <li><a href="" onClick={(e) => logout(e)}>🚪 Salir</a></li>
                        </ul>
                    </nav>
                </>
            }
        </header>
    )
}

export default Header;