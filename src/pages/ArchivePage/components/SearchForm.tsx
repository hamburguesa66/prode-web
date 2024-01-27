import React, { useState } from "react";
import { useUserContext } from "../../../context/UserContext";

export interface SeachFormProps {
    loading: boolean,
    onSubmit: (completed: boolean, username: string) => void,
}

const SearchForm = (props: SeachFormProps) => {
    const { principal } = useUserContext();

    const [completed, setCompleted] = useState<boolean>(true);
    const [username, setUsername] = useState<string>(principal.username || "");

    const changeUsername = (e: React.FormEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value);
    };

    const handleSubmit = () => {
        props.onSubmit(completed, username);
    }

    return (
        <>
            <h3>Filtros de b&uacute;squeda:</h3>
            <p>
                <label>
                    <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
                    S&oacute;lo partidos finalizados
                </label>
                <br />
                <small>Eleg&iacute; si queres ver todos los partidos o solo aquellos que ya tienen un resultado.</small>
            </p>
            <p>
                <input type="text" placeholder="Usuario" value={username} onChange={changeUsername} maxLength={16} />
                <small>Tipea el nombre de un usuario para ver sus resultados.</small>
            </p>
            <button onClick={handleSubmit} disabled={props.loading || username.trim().length === 0}>
                {props.loading && <i className="spin">⌛</i>}{!props.loading && "Buscar"}
            </button>
            <hr />
        </>
    )
}

export default SearchForm;