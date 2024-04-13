import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Game } from "../../../../model/Game";
import MatchHeader from "../../MatchHeader";
import BetForm from "./Forms/BetForm";
import { useEffect, useState } from "react";
import { Bet } from "../../../../model/Bet";
import useAxios from "../../../../hooks/useAxios";
import DeleteGameForm from "./Forms/DeleteForm";
import CloseGameForm from "./Forms/CloseForm";
import ClickableSpan from "../../ClickableSpan/ClickableSpan";

export interface GameDetailProps {
    game: Game;
    isAdmin: Boolean;
    onClose: () => void;
    onRefresh: () => void;
}

const GameDetail = (props: GameDetailProps) => {

    const [bet, setBet] = useState<Bet>();

    const { response: bResponse, loading: bLoading } = useAxios({
        lazy: false,
        method: "GET",
        url: `/bet/list?gameIds=${props.game.id}`,
        data: undefined
    });

    useEffect(() => {
        if (bResponse?.data) {
            const bets = bResponse.data as Bet[];
            if (bets.length > 0) {
                setBet(bets[0]);
            } else {
                setBet(undefined);
            }
        }
    }, [bResponse]);

    return (
        <>
            <h3 style={{ marginBottom: "0px" }}>
                <FontAwesomeIcon icon="gamepad" /> Partido #{props.game.id}
            </h3>

            <h4 style={{ marginTop: "0px" }}>
                <ClickableSpan onClick={() => props.onClose()}>
                    <FontAwesomeIcon icon="backward" /> Regresar
                </ClickableSpan>
            </h4>

            <MatchHeader game={props.game} />

            {bLoading ? (
                <>
                    <FontAwesomeIcon icon="spinner" spin /> Cargando apuesta ...
                </>
            ) : (
                <>
                    <h4><FontAwesomeIcon icon="dice" /> Tu apuesta: {bet?.gameResult || "Ninguna"}</h4>
                    {props.game.state === 'NOT_STARTED' && <BetForm game={props.game} bet={bet} onSuccess={(g, b) => { setBet(b) }} />}
                </>
            )}

            {props.isAdmin && <>
                {props.game.state === 'PENDING_RESULT' && <>
                    <hr style={{ borderStyle: "dashed", borderColor: "#dbdbdb", borderWidth: "1px" }} />
                    <h4><FontAwesomeIcon icon="flag-checkered" /> Finalizar partido:</h4>
                    <CloseGameForm game={props.game} onSuccess={(it) => props.onRefresh()} />
                </>}

                {props.game.state !== 'DONE' && <>
                    <hr style={{ borderStyle: "dashed", borderColor: "#dbdbdb", borderWidth: "1px" }} />
                    <h4><FontAwesomeIcon icon="trash-alt" /> Eliminar partido:</h4>
                    <DeleteGameForm game={props.game} onSuccess={() => props.onRefresh()} />
                </>}
            </>}
        </>
    )
}

export default GameDetail;