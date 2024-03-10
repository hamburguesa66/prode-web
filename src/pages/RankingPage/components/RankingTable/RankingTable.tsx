import { UserScore } from '../../../../model/UserScore';
import './RankingTable.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface RankingTableProps {
    scores: UserScore[],
    loading: boolean
}

const RankingTable = (props: RankingTableProps) => {
    return (
        <div className="basic-table-container">
            <table>
                <thead>
                    <tr>
                        <th className="text-center rk-th-w10"><FontAwesomeIcon icon="hashtag" /></th>
                        <th className="text-center rk-th-w40"><FontAwesomeIcon icon="user-tie" /></th>
                        <th className="text-center rk-th-w20"><FontAwesomeIcon icon="sack-dollar" /></th>
                        <th className="text-center rk-th-w40"><FontAwesomeIcon icon="bullseye" /></th>
                    </tr>
                </thead>
                <tbody>
                    {props.loading ? (
                        <tr>
                            <td colSpan={4} className="text-center">
                                <FontAwesomeIcon icon="spinner" spin />
                            </td>
                        </tr>
                    ) : props.scores.length > 0 ? (
                        props.scores.map((it, idx) =>
                            <tr>
                                <td className="text-center">{idx + 1}</td>
                                <td className="text-center">
                                    {it.username}
                                </td>
                                <td className="text-center">{it.points}</td>
                                <td className="text-center">{it.accuracy.toFixed(0)}% ({it.won}/{it.played})</td>
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">
                                No se encontraron resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default RankingTable;