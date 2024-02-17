import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import useAxios from "../../../hooks/useAxios";
import { LoginResponse } from "../../../model/LoginResponse";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwesomeButton from "../../../components/Shared/AwesomeButton/AwesomeButton";

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

  const disableButton = loading || username.length < 8 || password.length < 8;

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
        toast.error("Los datos ingresados no son válidos");
      } else {
        toast.error("El servidor no está disponible en este momento.");
      }
    }
  }, [error]);

  return (
    <>
      <h3><FontAwesomeIcon icon="arrow-right-to-bracket" /> Entrar</h3>
      <p>Ingres&aacute; tu apodo y contrase&ntilde;a</p>
      <input type="text" placeholder="Apodo" value={username} onChange={changeUsername} maxLength={16} />
      <input type="password" placeholder="Contrase&ntilde;a" value={password} onChange={changePassword} maxLength={16} />
      <AwesomeButton onClick={sendData} loading={loading} disabled={disableButton}>
        Entrar
      </AwesomeButton>
    </>
  )
}

export default LoginForm;