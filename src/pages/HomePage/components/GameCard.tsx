import { useState } from "react";
import './GameCard.css';
import { Bet } from "../../../model/Bet";
import { Game } from "../../../model/Game";
import dayjs from "dayjs";
import Modal from "react-responsive-modal";
import BetForm from "./BetForm";
import { Team } from "../../../model/Team";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
    onBetChange: (it: Game, bet: Bet) => void;
}

const GameCard = (props: GamePanelProps) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const getState = () => {
        switch (props.game.state) {
            case 'NOT_STARTED':
                return "No iniciado";
            case 'IN_PROGRESS':
                return "En juego";
            case 'PENDING_RESULT':
                return "Finalizado (sin resultado)"
            case 'DONE':
                return "Finalizado (" + getResult() + ")";
            default:
                return "";
        }
    }

    const getResult = () => {
        switch (props.game.result) {
            case 'HOME_TEAM_WON':
                return "L";
            case 'AWAY_TEAM_WON':
                return "V";
            case 'DRAW':
                return "E";
            default:
                return "";
        }
    }

    const prettyPrintBet = () => {
        if (props.bet) {
            switch (props.bet.gameResult) {
                case 'HOME_TEAM_WON':
                    return <>Gana {props.game.homeTeam.name} (L)</>
                case 'AWAY_TEAM_WON':
                    return <>Gana {props.game.awayTeam.name} (V)</>
                case 'DRAW':
                    return <>Empate (E)</>
            }
        }
        return <>Ninguna</>;
    }

    const buildTeamWithScore = (team: Team, score: number | undefined) => {
        let isLoser = false

        if(props.game.result) {
            if(props.game.result === 'HOME_TEAM_WON' && team.id === props.game.awayTeam.id) {
                isLoser = true;
            }
            if(props.game.result === 'AWAY_TEAM_WON' && team.id === props.game.homeTeam.id) {
                isLoser = true;
            }
        }

        return <>
            <img className={ isLoser ? "loser-team" : undefined} 
                src={team.logo} alt={team.name} title={team.name} />
            <br />
            <code>{props.game.result ? score : "-"}</code>
        </>;
    }

    const buildCompetitionImg = () => {
        return <>
            <img
                src={props.game.competition.logo}
                alt={props.game.competition.name}
                title={props.game.competition.name} />
        </>;
    }

    const prettyPrintBetResult = () => {
        if(props.bet && props.game.result) {
            if(props.bet.gameResult === props.game.result) {
                return <strong style={{ color: "#135200" }}>Ganaste 3 puntos</strong>;
            } else {
                return <strong style={{ color: "#820014" }}>Perdiste</strong>;
            }
        }
        return <></>;
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

    const handleBetChange = (game: Game, bet: Bet) => {
        props.onBetChange(game,bet);
        setOpenDialog(false);
    };

    return (
        <>
            <Modal open={openDialog} onClose={() => setOpenDialog(false)} center>
                <BetForm 
                    game={props.game} 
                    bet={props.bet}
                    onSuccess={handleBetChange}
                    onError={() => setOpenDialog(false)} />
            </Modal>
            <div className="game-card-container">
                <table>
                    <thead>
                        <tr>
                            <th className="game-card-rounded-th"><abbr title="Local">L.</abbr></th>
                            <th><abbr title="Visitante">V.</abbr></th>
                            <th>Torneo</th>
                            <th>🗓️</th>
                            <th className="game-card-rounded-th">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{buildTeamWithScore(props.game.homeTeam, props.game.homeTeamScore)}</td>
                            <td>{buildTeamWithScore(props.game.awayTeam, props.game.awayTeamScore)}</td>
                            <td>{buildCompetitionImg()}</td>
                            <td>{dayjs(props.game.date).format("DD/MM HH:mm")}hs</td>
                            <td>{getState()}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} style={{ backgroundColor: getFooterBackgroundColor() }}>
                                <p>
                                    <strong>Tu apuesta: </strong>
                                    {prettyPrintBet()}
                                </p>
                                {props.game.state === 'NOT_STARTED' &&
                                    <button type="button" onClick={() => setOpenDialog(true)}>
                                        {props.bet && "Modificar Apuesta"}{!props.bet && "Hacer Apuesta"}
                                    </button>
                                }
                                {props.game.state === 'DONE' && props.bet && <p>
                                    {prettyPrintBetResult()}
                                </p>}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default GameCard;