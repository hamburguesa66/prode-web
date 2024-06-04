import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Game } from "../../model/Game";
import { Bet } from "../../model/Bet";
import useAxios from "../../hooks/useAxios";
import AwesomeButton from "./AwesomeButton/AwesomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
    onSuccess: (it: Game, bet: Bet) => void;
}

const BetForm = (props: GamePanelProps) => {
    const [betResult, setBetResult] = useState<string>(props.bet?.gameResult || "");
    const [betType, setBetType] = useState<string>(props.bet?.type || "");


    const changeBetResult = (e: React.FormEvent<HTMLSelectElement>): void => {
        setBetResult(e.currentTarget.value);
    };

    const changeBetType = (e: React.FormEvent<HTMLSelectElement>): void => {
        setBetType(e.currentTarget.value);
        setBetResult(""); 
    };

    const { response, loading, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/bet`,
        data: {
            gameId: props.game.id,
            result: betResult,
            betType: betType
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
        setBetResult(props.bet?.gameResult || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.bet]);
    
    const btnDisabled = betResult.length === 0 

    return (
        <>
            <p>
                Tipo de apuesta:
                <select className="full-width" value={betType} onChange={changeBetType}>
                    {!betType && <option value="" disabled={true}>Seleccione una opci&oacute;n</option>}
                    <option value="CLASSIC">Cl&aacute;sica (3 puntos)</option>
                    <option value="DOUBLE_CHANCE">Doble oportunidad (1 punto)</option>
                </select>
            </p>
            <p>
                Tu resultado:
                <select className="full-width" value={betResult} onChange={changeBetResult}>
                    {!props.bet && <option value="" disabled={true}>Seleccione una opci&oacute;n</option>}
                    {betType === "CLASSIC" && (
                        <>
                            <option value="HOME_TEAM_WON">Gana {props.game.homeTeam.name} (Local)</option>
                            <option value="AWAY_TEAM_WON">Gana {props.game.awayTeam.name} (Visitante)</option>
                            <option value="DRAW">Empate</option>
                        </>
                    )}
                    {betType === "DOUBLE_CHANCE" && (
                        <>
                            <option value="AWAY_TEAM_WON">Gana {props.game.homeTeam.name} o Empate</option>
                            <option value="DRAW">Gana {props.game.homeTeam.name} o Gana {props.game.awayTeam.name}</option>
                            <option value="HOME_TEAM_WON">Gana {props.game.awayTeam.name} o Empate</option>
                        </>
                    )}
                </select>
            </p>
            <AwesomeButton disabled={btnDisabled} loading={loading} onClick={() => sendData()} >
                <FontAwesomeIcon icon="dice" /> Guardar
            </AwesomeButton>
        </>
    )
}

export default BetForm;