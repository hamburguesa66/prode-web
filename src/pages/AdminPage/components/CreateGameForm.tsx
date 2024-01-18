import React, { useEffect, useState } from "react";
import TeamSearchPanel from "./TeamSearchPanel";
import CompetitionSearchPanel from "./CompetitionSearchPanel";
import useAxios from "../../../hooks/useAxios";
import { Game } from "../../../model/Game";
import toast from "react-hot-toast";

const CreateGameForm = () => {
    const [homeTeamId, setHomeTeamId] = useState<number>(0);
    const [awayTeamId, setAwayTeamId] = useState<number>(0);
    const [competitionId, setCompetitionId] = useState<number>(0);
    const [date, setDate] = useState<string>("");

    const changeHomeTeamId = (e: React.FormEvent<HTMLInputElement>): void => {
        setHomeTeamId(e.currentTarget.valueAsNumber);
    };

    const changeAwayTeamId = (e: React.FormEvent<HTMLInputElement>): void => {
        setAwayTeamId(e.currentTarget.valueAsNumber);
    };

    const changeCompetitionId = (e: React.FormEvent<HTMLInputElement>): void => {
        setCompetitionId(e.currentTarget.valueAsNumber);
    };

    const changeDate = (e: React.FormEvent<HTMLInputElement>): void => {
        setDate(e.currentTarget.value);
    };

    const { response, error, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/game`,
        data: {
            homeTeamId: homeTeamId,
            awayTeamId: awayTeamId,
            competitionId: competitionId,
            date: date,
            timeZone: "America/Argentina/Buenos_Aires"
        }
    });

    useEffect(() => {
        if (response?.data) {
            const game = response.data as Game;
            toast.success(`El partido ${game.id} fue creado correctamente`);
            setHomeTeamId(0);
            setAwayTeamId(0);
            setCompetitionId(0);
            setDate("");
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            toast.error(`Harry, ha ocurrido un problema. Mirá la consola.`);
        }
    }, [error]);

    return (
        <>
            <h3>📝 Crear un partido</h3>
            ID Equipo Local:
            <input type="number" value={homeTeamId} onChange={changeHomeTeamId} />
            ID Equipo Visitante:
            <input type="number" value={awayTeamId} onChange={changeAwayTeamId} />
            ID Torneo:
            <input type="number" value={competitionId} onChange={changeCompetitionId} />
            Fecha:
            <input type="datetime-local" value={date} onChange={changeDate} />
            <button type="button" onClick={sendData}>Crear</button>
            <hr />
            <h3>🔎 Buscador de equipos</h3>
            <TeamSearchPanel />
            <hr />
            <h3>🔎 Buscador de competiciones</h3>
            <CompetitionSearchPanel />
        </>
    )
}

export default CreateGameForm;