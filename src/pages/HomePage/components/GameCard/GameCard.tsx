import { useState } from "react";
import './GameCard.css';
import { Bet } from "../../../../model/Bet";
import { Game } from "../../../../model/Game";
import dayjs from "dayjs";
import Modal from "react-responsive-modal";
import { Team } from "../../../../model/Team";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BetForm from "../../../../components/Shared/BetForm";
import MatchHeader from "../../../../components/Shared/MatchHeader";
import usePrettifyBet from "../../../../hooks/usePrettifyBet";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
    onBetChange: (it: Game, bet: Bet) => void;
}

const GameCard = (props: GamePanelProps) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { result, outcome } = usePrettifyBet({game: props.game, bet: props.bet});

    const buildTeamWithScore = (team: Team, score: number | undefined) => {
        let isLoser = false

        if (props.game.result) {
            if (props.game.result === 'HOME_TEAM_WON' && team.id === props.game.awayTeam.id) {
                isLoser = true;
            }
            if (props.game.result === 'AWAY_TEAM_WON' && team.id === props.game.homeTeam.id) {
                isLoser = true;
            }
        }

        return <>
            <img className={isLoser ? "loser-team" : undefined}
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
        if (props.bet && props.game.result) {
            if (outcome.success) {
                return <strong style={{ color: "#135200" }}>{outcome.message}</strong>;
            } else {
                return <strong style={{ color: "#820014" }}>{outcome.message}</strong>;
            }
        }
        return <>-</>;
    }

    const getFooterBackgroundColor = () => {
        if (props.bet) {
            if (props.game.state !== 'DONE') {
                return "#e6f4ff";
            } else {
                if (outcome.success) {
                    return "#f6ffed";
                } else {
                    return "#fff1f0";
                }
            }
        }
        return undefined;
    }

    const handleBetChange = (game: Game, bet: Bet) => {
        props.onBetChange(game, bet);
        setOpenDialog(false);
    };

    return (
        <>
            <Modal
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                center
                closeOnEsc={false}
                closeOnOverlayClick={false}
            >
                <h3><FontAwesomeIcon icon="dice" /> Hacer una apuesta</h3>
                <MatchHeader game={props.game} />
                <BetForm
                    game={props.game}
                    bet={props.bet}
                    onSuccess={handleBetChange} />
            </Modal>
            <div className="basic-table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="text-center"><FontAwesomeIcon icon="l" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="v" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="trophy" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="calendar" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center">{buildTeamWithScore(props.game.homeTeam, props.game.homeTeamScore)}</td>
                            <td className="text-center">{buildTeamWithScore(props.game.awayTeam, props.game.awayTeamScore)}</td>
                            <td className="text-center">{buildCompetitionImg()}</td>
                            <td className="text-center">
                                {dayjs(props.game.date).format("DD/MM")}
                                <br />
                                {dayjs(props.game.date).format("HH:mm")}hs
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="text-center" style={{ backgroundColor: getFooterBackgroundColor(), borderRadius: "10px" }}>
                                <p>
                                    <strong>Tu apuesta:</strong>
                                </p>
                                <p>
                                    <small>{result}</small>
                                </p>
                                {props.game.state === 'NOT_STARTED' &&
                                    <button type="button" onClick={() => setOpenDialog(true)}>
                                        {props.bet && "Modificar Apuesta"}{!props.bet && "Hacer Apuesta"}
                                    </button>
                                }
                                {props.game.state === 'DONE' && <p>
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