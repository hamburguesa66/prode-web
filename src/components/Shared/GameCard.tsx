import React from "react";
import './GameCard.css';
import { Bet, Game } from "../../pages/Home";
import dayjs from "dayjs";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
}

const GameCard = (props: GamePanelProps) => {
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
                                <br/>
                                <code>-</code>
                            </td>
                            <td>
                                <img
                                    src={props.game.awayTeam.logo}
                                    alt={props.game.awayTeam.name} 
                                    title={props.game.awayTeam.name} />
                                <br/>
                                <code>-</code>
                            </td>
                            <td>
                                <img 
                                    src={props.game.competition.logo}
                                    alt={props.game.competition.name}
                                    title={props.game.competition.name} />
                                <br/>
                                <code>{props.game.competition.hashtag}</code>
                            </td>
                            <td>
                                {dayjs(props.game.date).format("DD/MM HH:mm")}hs
                            </td>
                            <td>
                                No iniciado
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        {!props.bet &&
                            <tr>
                                <td colSpan={5}>
                                    Tu apuesta: <code>Ninguna</code> | <a href="#">Hacer apuesta</a>
                                </td>
                            </tr>                        
                        }
                        {props.bet &&
                            <tr>
                                <td colSpan={5} style={{ backgroundColor: "#e6f4ff" }}>
                                    Tu apuesta: <code>{props.bet.result}</code> | <a href="#">Modificar apuesta</a>
                                </td>
                            </tr>
                        }
                        { /* <tr>
                            <td colSpan={5} style={{ backgroundColor: "#f6ffed" }}>
                                Tu apuesta: <code>Gana Visitante</code> ✅
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ backgroundColor: "#fff1f0" }}>
                                Tu apuesta: <code>Gana Local</code> ❌
                            </td>
                        </tr> */ }
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default GameCard;