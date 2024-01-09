import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const SignUpForm = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repassword, setRePassword] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);
    const [conditions, setConditions] = useState<boolean>(false);

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

    const changeRePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setRePassword(e.currentTarget.value);
    }

    const disableButton = loading || username.length < 8 || password.length < 8
        || repassword !== password || !terms || !conditions;

    useEffect(() => {
        if (response) {
            alert("✅ Registro completado correctamente.");
            setUsername("");
            setPassword("");
            setRePassword("");
            setTerms(false);
            setConditions(false);
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            if (error.response?.status) {
                alert("❗ Los datos ingresados no son válidos: "+error.response.data+".");
            } else {
                alert("💀 El servidor no está disponible en este momento.");
            }
        }
    }, [error]);

    return (
        <>
            <h3>📝 Unirse</h3>
            <p>
                Complet&aacute; los campos y registrate.
                Un vez registrado, vas a tener que <strong>esperar por la aprobaci&oacute;n de un admin</strong> antes de entrar.
            </p>
            <p>
                <input type="text" placeholder="Apodo" value={username} onChange={changeUsername} maxLength={16} />
                <small>Tu apodo tiene que tener al menos 8 caracteres y 16 como m&aacute;ximo (ls&oacute;lo letras o n&uacute;meros).</small>
            </p>
            <p>
                <input type="password" placeholder="Contrase&ntilde;a" value={password} onChange={changePassword} maxLength={16} />
                <small>Entre 8 y 16 caracteres. La contrase&ntilde;a tiene que tener al menos 4 n&uacute;meros y 4 letras.</small>
            </p>
            <p>
                <input type="password" placeholder="Repetir contrase&ntilde;a" value={repassword} onChange={changeRePassword} maxLength={16} />
            </p>
            <p>
                <label>
                    <input type="checkbox" checked={terms} onChange={() => setTerms(!terms)} />
                    Acepto las reglas del administrador y lo acepto como el amo y se&ntilde;or de esta p&aacute;gina
                </label>
                <label>
                    <input type="checkbox" checked={conditions} onChange={() => setConditions(!conditions)} />
                    Prometo no llorar si no me aceptan, si me bloquean o si pierdo
                </label>
            </p>
            <button type="button" onClick={sendData} disabled={disableButton}>
                {loading && <i className="spin">⌛</i>}{!loading && "Registrarse"}
            </button>
        </>
    )
}

export default SignUpForm;