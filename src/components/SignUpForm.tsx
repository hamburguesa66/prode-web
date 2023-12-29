import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const SignUpForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/auth/signup`,
        data: { username, password }
      });

    
    const changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value);
      };
    
    const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    useEffect(() => {
        if (response) {
            alert("User created");
        }
      }, [response]);

    return (
        <>
            <h3>🆕 Registrar nuevo usuario</h3>
            <input type="text" placeholder="Apodo" value={username} onChange={changeUsername}/>
            <input type="password" placeholder="Contrase&ntilde;a" value={password} onChange={changePassword}/>
            <button type="button" onClick={sendData}>Registrarse</button>
        </>
    )
}

export default SignUpForm;