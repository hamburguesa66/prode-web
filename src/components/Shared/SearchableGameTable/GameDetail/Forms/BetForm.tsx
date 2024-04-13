import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Game } from "../../../../../model/Game";
import { Bet } from "../../../../../model/Bet";
import useAxios from "../../../../../hooks/useAxios";
import AwesomeButton from "../../../AwesomeButton/AwesomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
    onSuccess: (it: Game, bet: Bet) => void;
}

const BetForm = (props: GamePanelProps) => {
    const [betResult, setBetResult] = useState<string>(props.bet?.gameResult || "");

    const changeBetResult = (e: React.FormEvent<HTMLSelectElement>): void => {
        setBetResult(e.currentTarget.value);
    };

    const { response, loading, sendData } = useAxios({
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

    return (
        <>
            <p>
                Tipo de apuesta:
                <select className="full-width">
                    <option selected disabled={true}>Cl&aacute;sica (3 puntos)</option>
                </select>
            </p>
            <p>
                Tu resultado:
                <select className="full-width" defaultValue={betResult} onChange={(e) => changeBetResult(e)}>
                    {!props.bet && <option value={""} disabled={true}>Seleccione una opci&oacute;n</option>}
                    <option value="HOME_TEAM_WON">Gana {props.game.homeTeam.name} (Local)</option>
                    <option value="AWAY_TEAM_WON">Gana {props.game.awayTeam.name} (Visitante)</option>
                    <option value="DRAW">Empate</option>
                </select>
            </p>
            <AwesomeButton disabled={betResult.length === 0} loading={loading} onClick={() => sendData()} >
                <FontAwesomeIcon icon="dice" /> Guardar
            </AwesomeButton>
        </>
    )
}

export default BetForm;