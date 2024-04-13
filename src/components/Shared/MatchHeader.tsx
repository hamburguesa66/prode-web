import dayjs from "dayjs";
import './MatchHeader.css';
import { Game } from "../../model/Game";
import { Team } from "../../model/Team";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VersusIcon from "./VersusIcon";

export interface MatchHeaderProps {
    game: Game;
}

const MatchHeader = (props: MatchHeaderProps) => {

    const buildTeamImg = (team: Team) => {
        return <img
            className="match-header-v-align-middle" alt={team.name} src={team.logo} />
    }

    const buildTeamAbbr = (team: Team) => {
        return <abbr
            className="match-header-v-align-middle" title={team.name}>{team.shortName}
        </abbr>
    }

    const prettyPrintResult = (game: Game) => {
        switch (game.result) {
            case 'HOME_TEAM_WON':
                return <span>Gan&oacute; {game.homeTeam.name} (Local) por {game.homeTeamScore} a {game.awayTeamScore}.</span>
            case 'AWAY_TEAM_WON':
                return <span>Gan&oacute; {game.awayTeam.name} (Visitante) por {game.awayTeamScore} a {game.homeTeamScore}.</span>
            case 'DRAW':
                return <span>Empate ({game.homeTeamScore} a {game.awayTeamScore}).</span>;
            default:
                return <>-</>;
        }
    }

    return (
        <>
            <div className="match-header-container">
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={3} className="match-header-td-centered">
                                {props.game.state === 'NOT_STARTED' && <>
                                    <FontAwesomeIcon icon="calendar" /> {dayjs(props.game.date).format("DD/MM HH:mm")}
                                </>}
                                {props.game.state === 'IN_PROGRESS' && <>En juego</>}
                                {props.game.state === 'PENDING_RESULT' && <>Finalizado (?)</>}
                                {props.game.state === 'DONE' && <>Finalizado</>}
                            </td>
                        </tr>
                        <tr>
                            <td className="match-header-td-right">
                                {buildTeamImg(props.game.homeTeam)}
                                &nbsp;
                                {buildTeamAbbr(props.game.homeTeam)}
                                {props.game.state === 'DONE' && <strong style={{ marginLeft: "12px" }}>{props.game.homeTeamScore || "-"}</strong>}
                            </td>
                            <td className="match-header-td-centered match-header-v-align-middle">
                                <VersusIcon />
                            </td>
                            <td className="match-header-td-left">
                                {props.game.state === 'DONE' && <strong style={{ marginRight: "12px" }}>{props.game.awayTeamScore}</strong>}
                                {buildTeamAbbr(props.game.awayTeam)}
                                &nbsp;
                                {buildTeamImg(props.game.awayTeam)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="match-header-td-centered">
                                <img className="match-header-v-align-middle"
                                    width={16} height={16} src={props.game.competition.logo} alt={props.game.competition.name} />
                                &nbsp;
                                <small>{props.game.competition.name}</small>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
            {props.game.state !== 'NOT_STARTED' && <ul className="match-header-summary">
                <li>
                    <FontAwesomeIcon icon="calendar" /> El partido comenz&oacute; el {dayjs(props.game.date).format("DD/MM HH:mm")}.
                </li>
                {props.game.state === 'PENDING_RESULT' && <li>
                    <FontAwesomeIcon icon="info-circle" /> El partido ha terminado, pero falta que el administrador cargue el resultado en el sistema.
                </li>}
                {props.game.state === 'DONE' && <li>
                    <FontAwesomeIcon icon="check-double" /> {prettyPrintResult(props.game)}
                </li>}
            </ul>}
        </>
    )
}

export default MatchHeader;