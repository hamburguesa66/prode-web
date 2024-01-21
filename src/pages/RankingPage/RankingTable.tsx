import React from "react";
import { UserScore } from "../../model/UserScore";

export interface RankingTableProps {
    scores: UserScore[],
    loading: boolean,
}

const RankingTable = (props: RankingTableProps) => {

    const getPositionSpan = (idx: number) => {
        switch (idx) {
            case 0:
                return <span>🥇</span>;
            case 1:
                return <span>🥈</span>;
            case 2:
                return <span>🥉</span>;
            default:
                return <span>&nbsp;{idx + 1}&nbsp;</span>;
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <abbr title="Posici&oacute;n">Pos.</abbr>
                    </th>
                    <th>Usuario</th>
                    <th>Puntos</th>
                    <th>
                        <abbr title="Apuestas ganadas / Total de apuestas">G/T</abbr>
                    </th>
                    <th>
                        <abbr title="Precisi&oacute;n">Pre.</abbr>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.loading ? (
                    <tr>
                        <td colSpan={5} style={{ textAlign: "center" }}>
                            <i className="spin">⌛</i>
                        </td></tr>
                ) : (
                    props.scores.map((it, idx) =>
                        <tr>
                            <td>{getPositionSpan(idx)}</td>
                            <td>{it.username}</td>
                            <td>{it.points}</td>
                            <td>{it.won}/{it.played}</td>
                            <td>{it.accuracy.toFixed(0)} %</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

export default RankingTable;