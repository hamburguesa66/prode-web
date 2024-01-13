import React, { useEffect, useState } from "react";
import { Team } from "../../../model/Team";
import useAxios from "../../../hooks/useAxios";

const TeamSearchPanel = () => {
    const [query, setQuery] = useState<string>("");
    const [teams, setTeams] = useState<Team[]>([]);

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/team?name=${query}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setTeams(response.data as Team[])
        }
    }, [response]);

    const changeQuery = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
    };

    return (
        <>
            Buscar equipo/s por nombre:
            <input type="text" value={query} onChange={changeQuery} readOnly={loading}/>
            <button type="button" onClick={sendData} disabled={loading}>Buscar</button>
            {loading && <i className="spin">⌛</i>}
            {!loading && !error && <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                {teams.length === 0 && <li>Sin resultados</li>}
                {teams.map(it => <li><code>ID {it.id}</code> | {it.name}</li>)}
            </ul>}
        </>
    )
}

export default TeamSearchPanel;