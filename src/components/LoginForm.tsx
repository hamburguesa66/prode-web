import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import useAxios from "../hooks/useAxios";
import { LoginResponse } from "../model/LoginResponse";

const LoginForm = () => {
  const { setPrincipal } = useUserContext();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { response, loading, error, sendData } = useAxios({
    lazy: true,
    method: "POST",
    url: `/auth/login`,
    data: { username, password }
  });

  const changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  };

  const changePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  useEffect(() => {
    if (response?.data) {
      const data = response.data as LoginResponse;
      setPrincipal({
        isAuthenticated: true,
        username: data.user.username,
        isAdmin: data.user.isAdmin,
        token: data.token
      });
    }
  }, [response, setPrincipal]);

  useEffect(() => {
    if (error) {
      if(error.response?.status && (error.response.status === 400 || error.response.status === 404)) {
        alert("❗ Los datos ingresados no son válidos.");
      } else {
        alert("💀 El servidor no está disponible en este momento.");
      }
    }
  }, [error]);

  return (
    <>
      <h3>🔑 Entrar</h3>
      <p>Ingres&aacute; tu apodo y contrase&ntilde;a</p>
      <input type="text" placeholder="Apodo" value={username} onChange={changeUsername} maxLength={16} />
      <input type="password" placeholder="Contrase&ntilde;a" value={password} onChange={changePassword} maxLength={16} />
      <button type="button" onClick={sendData} disabled={loading || username.length < 8 || password.length < 8}>
        {loading && <i className="spin">⌛</i>}{!loading && "Entrar"}
      </button>
    </>
  )
}

export default LoginForm;