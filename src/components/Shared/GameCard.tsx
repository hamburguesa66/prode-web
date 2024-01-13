import React, { useEffect, useState } from "react";
import './GameCard.css';
import { Bet } from "../../model/Bet";
import { Game } from "../../model/Game";
import dayjs from "dayjs";
import useAxios from "../../hooks/useAxios";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
}

const GameCard = (props: GamePanelProps) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [betResult, setBetResult] = useState<string>(props.bet?.result || "");

    const changeBetResult = (e: React.FormEvent<HTMLSelectElement>): void => {
        setBetResult(e.currentTarget.value);
    };

    const { response, error, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/bet`,
        data: {
            gameId: props.game.id,
            result: betResult
        }
    });

    useEffect(() => {
        if (response) {
            alert(`Tu apuesta fue registrada correctamente`);
            window.location.reload();
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            alert(`Harry, ha ocurrido un problema. Mirá la consola.`);
            console.log(error);
        }
    }, [error]);

    const getResultDisplayName = (aResult: string | undefined) => {
        switch (aResult) {
            case "HOME_TEAM_WON":
                return "Local";
            case "AWAY_TEAM_WON":
                return "Visitante"
            case "DRAW":
                return "Empate";
            default:
                return "Ninguna";
        }
    }

    const getFooterBackgroundColor = () => {
        if (props.bet) {
            if (props.game.state !== 'DONE') {
                return "#e6f4ff";
            } else {
                if (props.bet.result === props.game.result) {
                    return "#f6ffed";
                } else {
                    return "#fff1f0";
                }
            }
        }
        return undefined;
    }

    return (
        <>
            <div className="game-card-container">
                <table>
                    <thead>
                        <tr>
                            <th>Local</th>
                            <th>Visitante</th>
                            <th>Torneo</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img
                                    src={props.game.homeTeam.logo}
                                    alt={props.game.homeTeam.name}
                                    title={props.game.homeTeam.name} />
                                <br />
                                <code>{props.game.homeTeamScore || "-"}</code>
                            </td>
                            <td>
                                <img
                                    src={props.game.awayTeam.logo}
                                    alt={props.game.awayTeam.name}
                                    title={props.game.awayTeam.name} />
                                <br />
                                <code>{props.game.awayTeamScore || "-"}</code>
                            </td>
                            <td>
                                <img
                                    src={props.game.competition.logo}
                                    alt={props.game.competition.name}
                                    title={props.game.competition.name} />
                                <br />
                                <code>{props.game.competition.hashtag}</code>
                            </td>
                            <td>
                                {dayjs(props.game.date).format("DD/MM HH:mm")}hs
                            </td>
                            <td>
                                {props.game.state === 'NOT_STARTED' && <span>No iniciado</span>}
                                {props.game.state === 'IN_PROGRESS' && <span>En curso</span>}
                                {props.game.state === 'PENDING_RESULT' && <span>Finalizado, esperando resultado</span>}
                                {props.game.state === 'DONE' && <span>{getResultDisplayName(props.game.result)}</span>}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} style={{ backgroundColor: getFooterBackgroundColor() }}>
                                <dialog open={openDialog} id="bet-dialog">
                                    <header>Hacer una apuesta:</header>
                                    Resultado:
                                    <select style={{ width: "100%" }} defaultValue={betResult} onChange={(e) => changeBetResult(e)}>
                                        {!props.bet && <option disabled={true} selected={true}>Seleccione una opci&oacute;n</option>}
                                        <option value="HOME_TEAM_WON">Gan&oacute; Equipo Local</option>
                                        <option value="AWAY_TEAM_WON">Gan&oacute; Equipo Visitante</option>
                                        <option value="DRAW">Empate</option>
                                    </select>
                                    <button type="button" onClick={() => sendData()}>Enviar</button>
                                    <button type="button" onClick={() => setOpenDialog(false)}>Cancelar</button>
                                </dialog>
                                {!openDialog && <section>
                                    Tu apuesta: <code>{getResultDisplayName(props?.bet?.result)}</code>
                                    {props.game.state === 'NOT_STARTED' && <>
                                        <br />
                                        <button type="button" onClick={() => setOpenDialog(true)}>
                                            {props.bet && "Modificar Apuesta"}{!props.bet && "Hacer Apuesta"}
                                        </button>
                                    </>}
                                    {props.game.state === 'DONE' && props?.bet?.result === props.game.result && <>✅</>}
                                    {props.game.state === 'DONE' && props?.bet?.result !== props.game.result && <>❌</>}
                                </section>}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default GameCard;