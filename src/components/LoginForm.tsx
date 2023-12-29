import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import useAxios from "../hooks/useAxios";

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
  }, [response]);

  return (
    <>
      <h3>🔐 Ingres&aacute; tu apodo y contrase&ntilde;a</h3>
      <p>Error {error?.message}</p>
      <input type="text" placeholder="Apodo" value={username} onChange={changeUsername} />
      <input type="password" placeholder="Contrase&ntilde;a" value={password} onChange={changePassword} />
      <button type="button" onClick={sendData}>Entrar</button>
    </>
  )
}

export default LoginForm;