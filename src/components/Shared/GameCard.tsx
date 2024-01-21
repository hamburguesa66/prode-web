import { useState } from "react";
import './GameCard.css';
import { Bet } from "../../model/Bet";
import { Game } from "../../model/Game";
import dayjs from "dayjs";
import Modal from "react-responsive-modal";
import BetForm from "../../pages/HomePage/components/BetForm";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
}

const GameCard = (props: GamePanelProps) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const getResultDisplayName = (aResult: string | undefined) => {
        switch (aResult) {
            case "HOME_TEAM_WON":
                return "Gana " + props.game.homeTeam.name + " (Local)";
            case "AWAY_TEAM_WON":
                return "Gana " + props.game.awayTeam.name + " (Visitante)";
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
                if (props.bet.gameResult === props.game.result) {
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
            <Modal open={openDialog} onClose={() => setOpenDialog(false)} center>
                <BetForm
                    game={props.game} bet={props.bet} />
            </Modal>
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
                                <code>{props.game.result ? props.game.homeTeamScore  : "-"}</code>
                            </td>
                            <td>
                                <img
                                    src={props.game.awayTeam.logo}
                                    alt={props.game.awayTeam.name}
                                    title={props.game.awayTeam.name} />
                                <br />
                                <code>{props.game.result ? props.game.awayTeamScore : "-"}</code>
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
                                <section>
                                    Tu apuesta: <code>{getResultDisplayName(props?.bet?.gameResult)}</code>
                                    {props.game.state === 'NOT_STARTED' && <>
                                        <br />
                                        <button type="button" onClick={() => setOpenDialog(true)}>
                                            {props.bet && "Modificar Apuesta"}{!props.bet && "Hacer Apuesta"}
                                        </button>
                                    </>}
                                    {props.game.state === 'DONE' && props?.bet?.gameResult === props.game.result && <>✅</>}
                                    {props.game.state === 'DONE' && props?.bet?.gameResult !== props.game.result && <>❌</>}
                                </section>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default GameCard;