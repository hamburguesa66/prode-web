import dayjs from "dayjs";
import { Game } from "../../../../model/Game";
import './CondensedGameTable.css';

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
            <small>&nbsp;🆚&nbsp;</small>
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
        <table>
            <thead>
                <tr>
                    <th><abbr title="Competencia">Com.</abbr></th>
                    <th><abbr title="Partido">Par.</abbr></th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {props.loading ? (
                    <tr>
                        <td colSpan={5} className="condensed-game-table-td-centered">
                            <i className="spin">⌛</i>
                        </td></tr>
                ) : (
                    props.games.map((it,idx) =>
                        <tr key={idx} className={ it.state === 'PENDING_RESULT' ? "condensed-game-table-tr-important" : undefined }>
                            <td className="condensed-game-table-td">
                                <img src={it.competition.logo} alt={it.competition.name} width={24} height={24} />
                            </td>
                            <td className="condensed-game-table-td">{getSummary(it)}</td>
                            <td className="condensed-game-table-td">{dayjs(it.date).format("DD/MM HH:mm")}</td>
                            <td className="condensed-game-table-td">{getState(it)}</td>
                            <td className="condensed-game-table-td">
                                {it.state === 'NOT_STARTED' && <button onClick={() => props.onDelete(it)} className="btn-small">🗑️</button>}
                                {it.state === 'PENDING_RESULT' && <button onClick={() => props.onClose(it)} className="btn-small">📝</button>}
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

export default CondensedGameTable;