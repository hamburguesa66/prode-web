import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { useUserContext } from "../context/UserContext";

export class LiteUser {
    username: string | undefined;
    isAdmin: Boolean;
  
    constructor() {
      this.username = undefined;
      this.isAdmin = false;
    }
  }

export class LoginResponse {
    user: LiteUser;
    token: string;
  
    constructor() {
      this.user = new LiteUser();
      this.token = "";
    }
  }

const LoginForm = () => {
    const { principal, setPrincipal } = useUserContext();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value);
      };
    
    const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const login = () => {
        AuthService.login(username,password).then(
            (data : LoginResponse) => { 
                setPrincipal({
                    isAuthenticated: true,
                    username: data.user.username,
                    isAdmin: data.user.isAdmin,
                })
                alert('Yay');
            },
            error => { alert(error) }
        )
    }

    return (
        <>
            <h3>🔐 Ingres&aacute; tu apodo y contrase&ntilde;a</h3>
            <input type="text" placeholder="Apodo" value={username} onChange={changeUsername}/>
            <input type="password" placeholder="Contrase&ntilde;a" value={password} onChange={changePassword}/>
            <button type="button" onClick={login}>Entrar</button>
        </>
    )
}

export default LoginForm;