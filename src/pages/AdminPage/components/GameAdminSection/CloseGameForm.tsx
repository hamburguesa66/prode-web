import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import './CloseGameForm.css';
import MatchHeader from "../../../../components/Shared/MatchHeader";
import { Game } from "../../../../model/Game";
import useAxios from "../../../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../../../../components/Shared/Alert/Alert";
import AwesomeButton from "../../../../components/Shared/AwesomeButton/AwesomeButton";

export interface CloseGameFormProps {
    game: Game;
    onCancel: () => void;
    onSuccess: (it: Game) => void;
    onError: () => void;
}

const CloseGameForm = (props: CloseGameFormProps) => {
    const [result, setResult] = useState<string>();
    const [homeTeamGoals, setHomeTeamGoals] = useState<number>(0);
    const [awayTeamGoals, setAwayTeamGoals] = useState<number>(0);

    const changeHomeTeamGoals = (e: React.FormEvent<HTMLInputElement>) => {
        setHomeTeamGoals(e.currentTarget.valueAsNumber);
    }

    const changeAwayTeamGoals = (e: React.FormEvent<HTMLInputElement>) => {
        setAwayTeamGoals(e.currentTarget.valueAsNumber);
    }

    const prettyPrintResult = () => {
        switch (result) {
            case 'HOME_TEAM_WON':
                return <span>Gan&oacute; {props.game.homeTeam.name} (Local) por {homeTeamGoals} a {awayTeamGoals}.</span>
            case 'AWAY_TEAM_WON':
                return <span>Gan&oacute; {props.game.awayTeam.name} (Visitante) por {awayTeamGoals} a {homeTeamGoals}.</span>
            case 'DRAW':
                return <span>Empate ({homeTeamGoals} a {awayTeamGoals}).</span>;
            default:
                return <>-</>;
        }
    }

    useEffect(() => {
        if (Number.isNaN(homeTeamGoals) || Number.isNaN(awayTeamGoals)) {
            setResult(undefined);
            return;
        }
        if (homeTeamGoals > awayTeamGoals) {
            setResult("HOME_TEAM_WON");
            return;
        }
        if (awayTeamGoals > homeTeamGoals) {
            setResult("AWAY_TEAM_WON");
            return;
        }
        setResult("DRAW");
    }, [homeTeamGoals, awayTeamGoals]);

    const { loading, response, error, sendData } = useAxios({
        lazy: true,
        method: "PUT",
        url: `/game`,
        data: {
            gameId: props.game.id,
            result: result,
            homeTeamGoals: homeTeamGoals,
            awayTeamGoals: awayTeamGoals,
        }
    });

    useEffect(() => {
        if (response) {
            toast.success(`El partido ${props.game.id} fue actualizado correctamente`);
            props.onSuccess(
                {
                    ...props.game,
                    state: 'DONE',
                    homeTeamScore: homeTeamGoals,
                    awayTeamScore: awayTeamGoals,
                    result: result
                }
            );
        }
    }, [response, awayTeamGoals, homeTeamGoals, props, result]);

    useEffect(() => {
        if (error) {
            toast.error(`Ha ocurrido un problema al intentar cerrar el partido`);
            props.onError();
        }
    }, [error, props]);

    const disableSubmitButton = loading || Number.isNaN(homeTeamGoals)
        || Number.isNaN(awayTeamGoals);

    return (
        <>
            <h3><FontAwesomeIcon icon="flag-checkered" /> Cerrar un partido</h3>
            <MatchHeader game={props.game} />
            <p>
                Goles {props.game.homeTeam.name} (Local):
                <input className="close-game-form-number-input" type="number" value={homeTeamGoals} onChange={(e) => changeHomeTeamGoals(e)} />
                Goles {props.game.awayTeam.name} (Visitante):
                <input className="close-game-form-number-input" type="number" value={awayTeamGoals} onChange={(e) => changeAwayTeamGoals(e)} />
            </p>
            <Alert type="pikachu">
                <strong>Resultado:</strong> {prettyPrintResult()}
            </Alert>
            <AwesomeButton loading={loading} disabled={disableSubmitButton} onClick={sendData}>
                Enviar
            </AwesomeButton>
            <AwesomeButton disabled={loading} onClick={props.onCancel}>
                Cancelar
            </AwesomeButton>
        </>
    )
}

export default CloseGameForm;