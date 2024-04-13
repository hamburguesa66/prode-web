import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Game } from "../../../../../model/Game";
import useAxios from "../../../../../hooks/useAxios";
import AwesomeButton from "../../../AwesomeButton/AwesomeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface DeleteGameFormProps {
    game: Game;
    onSuccess: () => void;
}

const DeleteGameForm = (props: DeleteGameFormProps) => {
    const [count, setCount] = useState<number>(3);

    const { loading, response, sendData } = useAxios({
        lazy: true,
        method: "DELETE",
        url: `/game?id=${props.game.id}`,
        data: {}
    });

    useEffect(() => {
        if (response) {
            toast.success(`El partido #${props.game.id} ha sido eliminado correctamente.`);
            props.onSuccess();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    useEffect(() => {
        if (count === 0) {
            sendData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    return (
        <>
            <p>
                Usted quiere <strong>eliminar</strong> el partido (por ejemplo, porque el mismo fue cancelado, suspendido o reprogramado).
                Las <strong>apuestas</strong> que se hicieron para el mismo tambi&eacute;n ser&aacute;n eliminadas.
                S&oacute;lo los partidos no finalizados pueden eliminarse y por lo tanto el <strong>ranking</strong> no se ve afectado por esta acci&oacute;n.
                Pero dicha acci&oacute;n es <strong>permanente</strong>, no se puede deshacer.
            </p>
            <p>Presione el bot&oacute;n tres veces para realizar la eliminaci&oacute;n.</p>
            <AwesomeButton disabled={loading} loading={loading} onClick={decreaseCount}>
                {count === 1 ? (
                    <><FontAwesomeIcon icon="trash-alt" /> Eliminar</>
                ) : (
                    <><FontAwesomeIcon icon="exclamation-circle" /> Confirmar ({count})</>
                )}
            </AwesomeButton>
        </>
    )
}

export default DeleteGameForm;