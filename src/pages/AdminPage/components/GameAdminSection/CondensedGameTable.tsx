import dayjs from "dayjs";
import { Game } from "../../../../model/Game";
import './CondensedGameTable.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface CondensedGameTableProps {
    games: Game[],
    loading: boolean,
    onDelete: (game: Game) => void,
    onClose: (game: Game) => void,
}

const CondensedGameTable = (props: CondensedGameTableProps) => {

    const getSummary = (it: Game) => {
        return <>
            <img src={it.homeTeam.logo} alt={it.homeTeam.name} width={24} height={24} />
            &nbsp;
            <img src={it.awayTeam.logo} alt={it.awayTeam.name} width={24} height={24} />
        </>
    }

    const getState = (it: Game) => {
        switch (it.state) {
            case 'NOT_STARTED':
                return "No iniciado";
            case 'IN_PROGRESS':
                return "En juego";
            case 'PENDING_RESULT':
                return "Finalizado (sin resultado)"
            case 'DONE':
                return "Finalizado (" + getResult(it) + ")";
            default:
                return "";
        }
    }

    const getResult = (it: Game) => {
        switch (it.result) {
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

    return (
        <div className="condensed-game-table-container">
            <table style={{ marginBottom: "0px" }}>
                <thead>
                    <tr>
                        <th><FontAwesomeIcon icon="trophy" /></th>
                        <th><FontAwesomeIcon icon="gamepad" /></th>
                        <th><FontAwesomeIcon icon="calendar" /></th>
                        <th><FontAwesomeIcon icon="signal" /></th>
                        <th><FontAwesomeIcon icon="wand-magic-sparkles" /></th>
                    </tr>
                </thead>
                <tbody>
                    {props.loading ? (
                        <tr>
                            <td colSpan={5} className="condensed-game-table-td-centered">
                                <FontAwesomeIcon icon="spinner" spin />
                            </td>
                        </tr>
                    ) : props.games.length > 0 ? (
                        props.games.map((it, idx) =>
                            <tr key={idx}>
                                <td className="condensed-game-table-td">
                                    <img src={it.competition.logo} alt={it.competition.name} width={24} height={24} />
                                </td>
                                <td className="condensed-game-table-td">{getSummary(it)}</td>
                                <td className="condensed-game-table-td">{dayjs(it.date).format("DD/MM HH:mm")}</td>
                                <td className="condensed-game-table-td">{getState(it)}</td>
                                <td className="condensed-game-table-td">
                                    {it.state === 'NOT_STARTED' && <button onClick={() => props.onDelete(it)} className="btn-small"><FontAwesomeIcon icon="trash-can" /></button>}
                                    {it.state === 'PENDING_RESULT' && <button onClick={() => props.onClose(it)} className="btn-small"><FontAwesomeIcon icon="flag-checkered" /></button>}
                                </td>
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan={5} className="condensed-game-table-td-centered">
                                No se encontraron partidos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CondensedGameTable;