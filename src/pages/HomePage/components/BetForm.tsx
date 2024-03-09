import React, { useEffect, useState } from "react";
import { Game } from "../../../model/Game";
import { Bet } from "../../../model/Bet";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import MatchHeader from "../../../components/Shared/MatchHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
    onSuccess: (it: Game, bet: Bet) => void;
    onError: () => void;
}

const BetForm = (props: GamePanelProps) => {
    const [betResult, setBetResult] = useState<string>(props.bet?.gameResult || "");

    const changeBetResult = (e: React.FormEvent<HTMLSelectElement>): void => {
        setBetResult(e.currentTarget.value);
    };

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/bet`,
        data: {
            gameId: props.game.id,
            result: betResult
        }
    });

    useEffect(() => {
        if (response) {
            toast.success("Tu apuesta fue registrada correctamente");
            props.onSuccess(props.game, response.data as Bet);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    useEffect(() => {
        if (error) {
            toast.error(`Harry, ha ocurrido un problema. Mirá la consola.`);
            props.onError();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <>
            <h3><FontAwesomeIcon icon="dice" /> Hacer una apuesta</h3>
            <MatchHeader game={props.game} />
            <p>
                Tipo de apuesta:
                <select style={{ width: "100%" }}>
                    <option selected disabled={true}>Cl&aacute;sica (3 puntos)</option>
                </select>
            </p>
            <p>
                Tu resultado:
                <select style={{ width: "100%" }} defaultValue={betResult} onChange={(e) => changeBetResult(e)}>
                    {!props.bet && <option value={""} disabled={true}>Seleccione una opci&oacute;n</option>}
                    <option value="HOME_TEAM_WON">Gana {props.game.homeTeam.name} (Local)</option>
                    <option value="AWAY_TEAM_WON">Gana {props.game.awayTeam.name} (Visitante)</option>
                    <option value="DRAW">Empate</option>
                </select>
            </p>
            <button type="button" disabled={betResult.length === 0 || loading } onClick={() => sendData()}>
                {loading && <i className="spin">⌛</i>}{!loading && "Guardar"}
            </button>
        </>
    )
}

export default BetForm;