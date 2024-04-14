import './BetSection.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Game } from "../../../../../model/Game";
import { Bet } from "../../../../../model/Bet";
import BetForm from "../../../BetForm";
import Alert from "../../../Alert/Alert";
import useNico from "../../../../../hooks/usePrettifyBet";
import useMediaQuery from "../../../../../hooks/useMediaQuery";

export interface BetSectionProps {
    game: Game;
    bet?: Bet;
    onUpdate: (bet: Bet) => void;
}

const BetSection = (props: BetSectionProps) => {

    const { result, type, outcome } = useNico({ bet: props.bet, game: props.game });

    const betAlertType = props.game.state === 'DONE' ? (outcome.success ? "success" : "diablo") : "pikachu";

    const isDesktop = useMediaQuery('(min-width: 960px)');

    return (
        <>
            {props.bet ? (
                <Alert type={betAlertType}>
                    <div className="flex-container">
                        <div className={`half-width ${isDesktop ? "bet-section-font-medium" : "bet-section-font-small"}`}>
                            <strong>Tu resultado:</strong> {result}
                            <br />
                            <strong>Tu tipo de apuesta:</strong> {type}
                        </div>
                        <div className={`half-width ${isDesktop ? "bet-section-font-large" : "bet-section-font-small"}`}>
                            {props.game.state === 'DONE' && <div className="bet-section-outcome-panel">
                                <FontAwesomeIcon icon={outcome.success ? "circle-check" : "circle-xmark"} /> <strong className="ml-5">{outcome.message}</strong>
                            </div>}
                        </div>
                    </div>
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