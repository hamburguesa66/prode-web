import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Game } from "../../../model/Game";
import { Bet } from "../../../model/Bet";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
}

const GameCardTwo = (props: GamePanelProps) => {

    return (
        <div style={{ 
                borderRadius: "10px", 
                borderLeft: "3px solid #3f6600",
                boxShadow: "box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%)",
                backgroundColor: "#f6ffed"
            }}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <section>
                                <strong>{dayjs(props.game.date).format("DD/MM HH:mm")}</strong>
                            </section>
                            <section>
                                <img style={{ verticalAlign: "middle" }} src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/363.png&scale=crop&cquality=40&location=origin&w=32&h=32" /> <span style={{ verticalAlign: "middle" }}>CHE</span>
                            </section>
                            <section>
                                <img style={{ verticalAlign: "middle" }} src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/370.png&scale=crop&cquality=40&location=origin&w=32&h=32"/> <span style={{ verticalAlign: "middle" }}>FUL</span>
                            </section>
                            <section>
                                <pre>- UEFA Champions League</pre>
                            </section>
                        </td>
                        <td>
                            <section>&nbsp;</section>
                            <section>
                                <span style={{ verticalAlign: "middle" }}>-</span> <img style={{ visibility: "hidden", verticalAlign: "middle" }} src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/363.png&scale=crop&cquality=40&location=origin&w=32&h=32" />
                            </section>
                            <section>
                                <span style={{ verticalAlign: "middle" }}>-</span> <img style={{ visibility: "hidden", verticalAlign: "middle" }} src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/363.png&scale=crop&cquality=40&location=origin&w=32&h=32" />
                            </section>
                            <section></section>
                        </td>
                        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                            <span>🎲 Gana CHE 2 a 1 (exacta)</span>
                            <button style={{ color: "white", backgroundColor: "#3f6600" }} type="button">Cambiar apuesta</button>
                        </td>
                        {/* <td style={{ verticalAlign: "middle" }}>
                            <button type="button">Hacer apuesta</button>
                        </td>*/}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default GameCardTwo;