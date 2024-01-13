import React, { useEffect, useState } from "react";
import { Competition } from "../../Home";
import useAxios from "../../../hooks/useAxios";

const CompetitionSearchPanel = () => {
    const [query, setQuery] = useState<string>("");
    const [competitions, setCompetitions] = useState<Competition[]>([]);

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "GET",
        url: `/competition?name=${query}`,
        data: {}
    });

    useEffect(() => {
        if (response?.data) {
            setCompetitions(response.data as Competition[])
        }
    }, [response]);

    const changeQuery = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuery(e.currentTarget.value);
    };

    return (
        <>
            Buscar torneo/s por nombre:
            <input type="text" value={query} onChange={changeQuery} readOnly={loading}/>
            <button type="button" onClick={sendData} disabled={loading}>Buscar</button>
            {loading && <i className="spin">⌛</i>}
            {!loading && !error && <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                {competitions.length == 0 && <li>Sin resultados</li>}
                {competitions.map(it => <li><code>ID {it.id}</code> | {it.name}</li>)}
            </ul>}
        </>
    )
}

export default CompetitionSearchPanel;