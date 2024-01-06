import React from "react";
import './Header.css';
import { Principal, useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

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
        <>
            <h1>⚽ Prode</h1>
            {
                principal.isAuthenticated &&
                <>
                    <p>Hola, {principal.username}</p>
                    <nav>
                        <ul>
                            <li><a href="" onClick={(e) => goTo(e, "/home")}>🏠 Home</a></li>
                            <li><a href="" onClick={(e) => goTo(e, "/ranking")}>🏆 Ranking</a></li>
                            <li><a href="" onClick={(e) => goTo(e, "/profile")}>👤 Mi usuario</a></li>
                            {
                                principal.isAdmin && <li><a href="" onClick={(e) => goTo(e, "/admin")}>🛠️ Administraci&oacute;n</a></li>
                            }
                            <li><a href="" onClick={(e) => logout(e)}>🚪 Salir</a></li>
                        </ul>
                    </nav>
                </>
            }

            <hr />
        </>
    )
}

export default Header;