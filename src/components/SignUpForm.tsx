import React, { useState } from "react";
import AuthService from "../services/AuthService";

const SignUpForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value);
      };
    
    const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const register = () => {
        AuthService.register(username,password).then(
            () => { alert('User created') },
            error => { alert(error) }
        )
    }

    return (
        <>
            <h3>🆕 Registrar nuevo usuario</h3>
            <input type="text" placeholder="Apodo" value={username} onChange={changeUsername}/>
            <input type="password" placeholder="Contrase&ntilde;a" value={password} onChange={changePassword}/>
            <button type="button" onClick={register}>Registrarse</button>
        </>
    )
}

export default SignUpForm;