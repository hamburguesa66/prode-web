import React from "react";
import './Header.css';
import { Principal, useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProdeLogo from "../Shared/ProdeLogo";
import ClickableSpan from "../Shared/ClickableSpan/ClickableSpan";
import Avatar from "../Shared/Avatar/Avatar";

const Header = () => {
    const { principal, setPrincipal } = useUserContext();
    const navigate = useNavigate();

    const logout = () => {
        setPrincipal(new Principal());
        navigate("/");
    }

    return (
        <header>
            <h1>
                <ProdeLogo />
            </h1>
            {
                principal.isAuthenticated &&
                <>
                    <nav>
                        <ul>
                            <li>
                                <Avatar user={principal} size="md" /> {principal.name}
                            </li>
                            <li>
                                <ClickableSpan onClick={() => navigate("/home")}>
                                    <FontAwesomeIcon icon="house-flag" /> Home
                                </ClickableSpan>
                            </li>
                            <li>
                                <ClickableSpan onClick={() => navigate("/rules")}>
                                    <FontAwesomeIcon icon="book" /> Reglamento
                                </ClickableSpan>
                            </li>
                            <li>
                                <ClickableSpan onClick={() => navigate("/ranking")}>
                                    <FontAwesomeIcon icon="ranking-star" /> Ranking
                                </ClickableSpan>
                            </li>
                            <li>
                                <ClickableSpan onClick={() => navigate("/archive")}>
                                    <FontAwesomeIcon icon="box-archive" /> Archivo
                                </ClickableSpan>
                            </li>
                            {
                                principal.isAdmin &&
                                <li>
                                    <ClickableSpan onClick={() => navigate("/admin")}>
                                        <FontAwesomeIcon icon="screwdriver-wrench" /> Administraci&oacute;n
                                    </ClickableSpan>
                                </li>
                            }
                            <li>
                                <ClickableSpan onClick={() => logout()}>
                                    <FontAwesomeIcon icon="door-closed" /> Salir
                                </ClickableSpan>
                            </li>
                        </ul>
                    </nav>
                </>
            }
        </header>
    )
}

export default Header;