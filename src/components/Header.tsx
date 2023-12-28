import React from "react";
import { Principal, useUserContext } from "../context/UserContext";
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
        <h1>⚽ Prode <code>Beta</code></h1>
        {
            principal.isAuthenticated && 
            <>
                <p>Hola, {principal.username}</p>
                <nav className="menu">
                <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                    <li style={{display: "inline-block",marginRight: "10px"}}><a href="" onClick={(e) => goTo(e, "/home")}>🏠 Home</a></li>
                    <li style={{display: "inline-block",marginRight: "10px"}}><a href="" onClick={(e) => goTo(e, "/ranking")}>🏆 Ranking</a></li>
                    <li style={{display: "inline-block",marginRight: "10px"}}><a href="" onClick={(e) => goTo(e, "/profile")}>👤 Mi usuario</a></li>
                    <li style={{display: "inline-block",marginRight: "10px"}}><a href="" onClick={(e) => goTo(e, "/admin")}>🔧 Administraci&oacute;n</a></li>
                    <li style={{display: "inline-block",marginRight: "10px"}}><a href="" onClick={(e) => logout(e)}>🚪 Salir</a></li>
                </ul>
            </nav>
            </>
        }
        
        <hr/>
        </>
    )
}

export default Header;