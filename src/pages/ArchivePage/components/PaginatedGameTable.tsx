import { GameWithBet } from "../../../model/GameWithBet";
import dayjs from "dayjs";
import { Game } from "../../../model/Game";
import { Page } from "../../../model/Page";

export interface PaginatedGameTableProps {
    loading: boolean,
    pageable: Page<GameWithBet>,
    getNextPage: () => void,
    getPreviousPage: () => void,
}

const PaginatedGameTable = (props: PaginatedGameTableProps) => {

    const getSummary = (it: Game) => {
        return <>
            <img src={it.homeTeam.logo} alt={it.homeTeam.name} width={24} height={24} />
            <small>&nbsp;🆚&nbsp;</small>
            <img src={it.awayTeam.logo} alt={it.awayTeam.name} width={24} height={24} />
        </>
    }

    const getBet = (it: GameWithBet) => {
        if (!it.bet || it.game.state !== 'DONE') {
            return <>-</>;
        } else {
            if (it.bet.gameResult === it.game.result) {
                return <>✅</>;
            } else {
                return <>❌</>;
            }
        }
    }

    return (
        <div style={{ 
            marginTop: "1rem",
            borderRadius: "10px",
            borderBottom: "1px solid #dbdbdb",
            borderRight: "1px solid #dbdbdb",
            backgroundColor: "#fafafa"
        }}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            Total de resultados: {props.pageable.total}
                        </th>
                    </tr>
                    {props.pageable.total > 0 && <tr>
                        <th colSpan={4}>
                            P&aacute;gina {props.pageable.current + 1} de {props.pageable.pages}.
                        </th>
                    </tr>}
                    <tr>
                        <th><abbr title="Competencia">Com.</abbr></th>
                        <th><abbr title="Partido">Par.</abbr></th>
                        <th>Fecha</th>
                        <th style={{ textAlign: "center" }}>🎯</th>
                    </tr>
                </thead>
                <tbody>
                    {props.loading ? (
                        <tr>
                            <td colSpan={4} className="condensed-game-table-td-centered">
                                <i className="spin">⌛</i>
                            </td></tr>
                    ) : (props.pageable.data.length === 0) ? (
                        <tr>
                            <td colSpan={4}>Sin resultados</td>
                        </tr>
                    ) : (
                        props.pageable.data.map((it, idx) =>
                            <tr key={idx}>
                                <td className="condensed-game-table-td">
                                    <img src={it.game.competition.logo} alt={it.game.competition.name} width={24} height={24} />
                                </td>
                                <td className="condensed-game-table-td">{getSummary(it.game)}</td>
                                <td className="condensed-game-table-td">{dayjs(it.game.date).format("DD/MM HH:mm")}</td>
                                <td style={{ textAlign: "center", verticalAlign: "middle" }}>{getBet(it)}</td>
                            </tr>
                        )
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            {props.pageable.current > 0 &&
                                <button onClick={props.getPreviousPage}>⏪ Ant.</button>}
                        </td>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            {props.pageable.current + 1 < props.pageable.pages &&
                                <button onClick={props.getNextPage}>Sig. ⏩</button>}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default PaginatedGameTable;