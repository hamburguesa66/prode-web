import './CloseForm.css';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Game } from "../../../../../model/Game";
import useAxios from "../../../../../hooks/useAxios";
import AwesomeButton from "../../../AwesomeButton/AwesomeButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from '../../../Alert/Alert';

export interface CloseGameFormProps {
    game: Game;
    onSuccess: (it: Game) => void;
}

const CloseGameForm = (props: CloseGameFormProps) => {
    const [result, setResult] = useState<string>();
    const [homeTeamGoals, setHomeTeamGoals] = useState<number>(0);
    const [awayTeamGoals, setAwayTeamGoals] = useState<number>(0);
    const [confirmation, setConfirmation] = useState<boolean>(false);

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

    const { loading, response, sendData } = useAxios({
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    const disableSubmitButton = loading || Number.isNaN(homeTeamGoals) 
        || Number.isNaN(awayTeamGoals) || !confirmation;

    return (
        <>
            <p>
                Los resultados de los partidos deben ser cargados <strong>manualmente</strong> en el sistema.
                Complete los campos solicitados a continuaci&oacute;n y seleccione "Guardar".
                El resultado que se cargue aqu&iacute; ser&aacute; utilizado para <strong>procesar las apuestas y actualizar el ranking</strong>, por lo que esta operaci&oacute;n puede tardar unos minutos.
                Recuerde que el resultado que hay que cargar es el de los <strong>noventa (90)</strong> minutos (no debe tomar el resultado del tiempo extra o penales).
                Esta operaci&oacute;n es <strong>permanente</strong> y no se puede deshacer.
            </p>
            <p>
                Goles {props.game.homeTeam.name} (Local):
                <input className="close-game-form-number-input" type="number" value={homeTeamGoals} onChange={(e) => changeHomeTeamGoals(e)} />
                Goles {props.game.awayTeam.name} (Visitante):
                <input className="close-game-form-number-input" type="number" value={awayTeamGoals} onChange={(e) => changeAwayTeamGoals(e)} />
            </p>
            <Alert type="pikachu">
                <strong>Resultado:</strong> {prettyPrintResult()}
            </Alert>
            <p>
                <label>
                    <input type="checkbox" checked={confirmation} onChange={() => setConfirmation(!confirmation)} />
                    Confirmo que el resultado es el correcto
                </label>
            </p>
            <AwesomeButton loading={loading} disabled={disableSubmitButton} onClick={sendData}>
                <FontAwesomeIcon icon="floppy-disk" /> Guardar
            </AwesomeButton>
        </>
    )
}

export default CloseGameForm;