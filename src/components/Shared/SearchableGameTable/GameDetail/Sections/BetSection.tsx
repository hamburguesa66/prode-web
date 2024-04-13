import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Game } from "../../../../../model/Game";
import { Bet } from "../../../../../model/Bet";
import BetForm from "../Forms/BetForm";
import Alert from "../../../Alert/Alert";
import useNico from "../../../../../hooks/usePrettifyBet";

export interface BetSectionProps {
    game: Game;
    bet?: Bet;
    onUpdate: (bet: Bet) => void;
}

const BetSection = (props: BetSectionProps) => {

    const { result, type, outcome } = useNico({ bet: props.bet, game: props.game });

    const nico = props.game.state === 'DONE' ? (outcome.success ? "success" : "diablo") : "pikachu";

    return (
        <>
            <h4><FontAwesomeIcon icon="dice-one" /> Tu apuesta:</h4>

            {props.bet ? (
                <Alert type={nico}>
                    <strong>Tu resultado:</strong> {result}
                    <br />
                    <strong>Tu tipo de apuesta:</strong> {type}

                    {props.game.state === 'DONE' && <p>
                        <FontAwesomeIcon icon={outcome.success ? "circle-check" : "circle-xmark"} /> <strong>{outcome.message}</strong>
                    </p>}
                </Alert>
            ) : (
                <Alert type="default">Ninguna</Alert>
            )}

            {props.game.state === 'NOT_STARTED' && <>
                <h4><FontAwesomeIcon icon="dice-two" /> Hacer/modificar apuesta:</h4>
                <BetForm game={props.game} bet={props.bet} onSuccess={(g, b) => { props.onUpdate(b) }} />
            </>}

            {(props.game.state === 'IN_PROGRESS' || props.game.state === 'PENDING_RESULT') &&
                <Alert type="info">
                    <FontAwesomeIcon icon="info-circle" /> El partido ya ha comenzado. Las apuestas estan cerradas.
                </Alert>
            }
        </>
    )
}

export default BetSection;