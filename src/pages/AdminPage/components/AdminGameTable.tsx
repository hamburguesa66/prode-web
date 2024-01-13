import { useEffect, useState } from "react";
import { Game } from "../../../model/Game";
import useAxios from "../../../hooks/useAxios";
import dayjs from "dayjs";

const AdminGameTable = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [action, setAction] = useState<[string, Game]>();

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [result, setResult] = useState<string>("");
    const [homeTeamGoals, setHomeTeamGoals] = useState<number>(0);
    const [awayTeamGoals, setAwayTeamGoals] = useState<number>(0);

    const changeResult = (e: React.FormEvent<HTMLSelectElement>): void => {
        setResult(e.currentTarget.value);
    };

    const changeHomeTeamGoals = (e: React.FormEvent<HTMLInputElement>) => {
        setHomeTeamGoals(e.currentTarget.valueAsNumber);
    }

    const changeAwayTeamGoals = (e: React.FormEvent<HTMLInputElement>) => {
        setAwayTeamGoals(e.currentTarget.valueAsNumber);
    }

    const { response } = useAxios({
        lazy: false,
        method: "GET",
        url: `/game`,
        data: undefined
    });

    useEffect(() => {
        if (response?.data) {
            setGames(response.data as Game[]);
        }
    }, [response]);

    const {
        response: deleteResponse,
        error: deleteError,
        sendData: sendDelete
    } = useAxios({
        lazy: true,
        method: "DELETE",
        url: `/game?id=${action?.[1].id}`,
        data: {}
    });

    useEffect(() => {
        if (deleteResponse) {
            alert(`El partido ${action?.[1].id} fue eliminado`);
            setAction(undefined);
        }
    }, [deleteResponse]);

    useEffect(() => {
        if (deleteError) {
            alert(`Harry, ha ocurrido un problema. Mirá la consola.`);
            console.log(deleteError);
        }
    }, [deleteError]);


    const deleteGame = (it: Game): void => {
        setAction(["DELETE", it]);
    };

    const showCloseForm = (it: Game): void => {
        setAction(["SHOW_MODAL", it]);
        setShowDialog(true);
    }

    const closeCloseForm = (): void => {
        setAction(undefined);
        setShowDialog(false);
    }

    const closeGame = (): void => {
        setAction(["CLOSE", action![1]]);
        setShowDialog(false);
    }

    const {
        response: updateResponse,
        error: updateError,
        sendData: sendUpdate
    } = useAxios({
        lazy: true,
        method: "PUT",
        url: `/game`,
        data: {
            gameId: action?.[1].id,
            result: result,
            homeTeamGoals: homeTeamGoals,
            awayTeamGoals: awayTeamGoals,
        }
    });

    useEffect(() => {
        if (updateResponse) {
            alert(`El partido ${action?.[1].id} fue actualizado`);
            setAction(undefined);
        }
    }, [updateResponse]);

    useEffect(() => {
        if (updateError) {
            alert(`Harry, ha ocurrido un problema. Mirá la consola.`);
            console.log(updateError);
        }
    }, [updateError]);

    useEffect(() => {
        if (action) {
            if (action[0] === "DELETE") {
                sendDelete();
            }
            if (action[0] === "CLOSE") {
                sendUpdate();
            }
        }
    }, [action]);


    return (
        <>
            <dialog open={showDialog} style={{}}>
                <header>Cerrar partido:</header>
                Resultado:
                <select value={result} onChange={(e) => changeResult(e)}>
                    <option value="HOME_TEAM_WON">Gan&oacute; Equipo Local</option>
                    <option value="AWAY_TEAM_WON">Gan&oacute; Equipo Visitante</option>
                    <option value="DRAW">Empate</option>
                </select>
                Goles Equipo Local:
                <input type="number" value={homeTeamGoals} onChange={(e) => changeHomeTeamGoals(e)} />
                Goles Equipo Visitante:
                <input type="number" value={awayTeamGoals} onChange={(e) => changeAwayTeamGoals(e)} />
                <button type="button" onClick={() => closeGame()}>Enviar</button>
                <button type="button" onClick={() => closeCloseForm()}>Cancelar</button>
            </dialog>

            <h3>🚨 Partidos que requieren atenci&oacute;n</h3>
            <p>Partidos pendientes de carga de resultado o pendientes de c&oacute;mputo (para el ranking)</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Detalle</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th style={{ textAlign: "center" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(it => <tr>
                        <td>{it.id}</td>
                        <td>
                            <small>
                                {it.homeTeam.name} vs {it.awayTeam.name} x <code>{it.competition.hashtag}</code>
                            </small>
                        </td>
                        <td>{dayjs(it.date).format("DD/MM HH:mm")}hs</td>
                        <td>
                            {it.result || "-"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                            <span onClick={() => deleteGame(it)}>🗑️</span>
                            &nbsp;|&nbsp;
                            <span onClick={() => showCloseForm(it)}>📝</span>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default AdminGameTable;