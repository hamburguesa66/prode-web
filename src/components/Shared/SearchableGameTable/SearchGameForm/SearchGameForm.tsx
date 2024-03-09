import React, { useState } from "react";
import './SearchGameForm.css';
import AwesomeButton from "../../AwesomeButton/AwesomeButton";

export interface SearchGameFormProps {
    loading: boolean,
    onSubmit: (status: string) => void,
}

const SearchGameForm = (props: SearchGameFormProps) => {
    const [status, setStatus] = useState<string>("ALL");

    const changeStatus = (e: React.FormEvent<HTMLSelectElement>): void => {
        setStatus(e.currentTarget.value);
    };

    const handleSubmit = () => {
        props.onSubmit(status);
    }

    return (
        <>
            <div id="search-game-form-container">
                <div>
                    <select className="full-width" value={status} onChange={(e) => changeStatus(e)} disabled={props.loading}>
                        <option value="ALL">Todos los partidos</option>
                        <option value="NOT_STARTED">Partidos no comenzados</option>
                        <option value="IN_PROGRESS">Partidos en juego</option>
                        <option value="DONE">Partidos finalizado</option>
                    </select>
                </div>
                <div>
                    <AwesomeButton className="full-width" onClick={handleSubmit} disabled={props.loading} >
                        Buscar
                    </AwesomeButton>
                </div>
            </div>
        </>
    )
}

export default SearchGameForm;