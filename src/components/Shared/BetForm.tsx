import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Game } from "../../model/Game";
import { Bet, BetType } from "../../model/Bet";
import useAxios from "../../hooks/useAxios";
import AwesomeButton from "./AwesomeButton/AwesomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface GamePanelProps {
    game: Game;
    bet: Bet | undefined;
    onSuccess: (it: Game, bet: Bet) => void;
}

const BetForm = (props: GamePanelProps) => {
    const [betResult, setBetResult] = useState<string | undefined>(undefined);
    const [betType, setBetType] = useState<BetType | undefined>(undefined);


    const changeBetResult = (e: React.FormEvent<HTMLSelectElement>): void => {
        setBetResult(e.currentTarget.value);
    };

    const changeBetType = (e: React.FormEvent<HTMLSelectElement>): void => {
        setBetType(e.currentTarget.value as BetType);
        setBetResult(undefined); 
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
        setBetType(props.bet?.type || undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.bet]);
    
    const btnDisabled = betResult?.length === 0 || (
        props?.bet?.type === betType && props.bet?.gameResult === betResult
    );

    return (
        <>
            <p>
                Tipo de apuesta:
                <select className="full-width" value={betType} onChange={changeBetType}>
                    {!betType && <option selected disabled={true}>Seleccione una opci&oacute;n</option>}
                    <option value={BetType.CLASSIC}>Cl&aacute;sica (3 puntos)</option>
                    <option value={BetType.DOUBLE_CHANCE}>Doble oportunidad (1 punto)</option>
                </select>
            </p>
            <p>
                Tu resultado:
                <select className="full-width" value={betResult} onChange={changeBetResult} disabled={!betType}>
                    {!betResult && <option selected disabled={true}>Seleccione una opci&oacute;n</option>}
                    {betType === BetType.CLASSIC && (
                        <>
                            <option value="HOME_TEAM_WON">Gana {props.game.homeTeam.name} (L)</option>
                            <option value="AWAY_TEAM_WON">Gana {props.game.awayTeam.name} (V)</option>
                            <option value="DRAW">Empate</option>
                        </>
                    )}
                    {betType === BetType.DOUBLE_CHANCE && (
                        <>
                            <option value="AWAY_TEAM_WON">Gana {props.game.homeTeam.name} (L) o Empate (E)</option>
                            <option value="DRAW">Gana {props.game.homeTeam.name} (L) o Gana {props.game.awayTeam.name} (V)</option>
                            <option value="HOME_TEAM_WON">Gana {props.game.awayTeam.name} (V) o Empate</option>
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