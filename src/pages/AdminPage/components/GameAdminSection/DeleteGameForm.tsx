import { useEffect } from "react";
import toast from "react-hot-toast";
import MatchHeader from "../../../../components/Shared/MatchHeader";
import { Game } from "../../../../model/Game";
import useAxios from "../../../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwesomeButton from "../../../../components/Shared/AwesomeButton/AwesomeButton";

export interface DeleteGameFormProps {
    game: Game;
    onCancel: () => void;
    onSuccess: () => void;
    onError: () => void;
}

const DeleteGameForm = (props: DeleteGameFormProps) => {
    const { loading, response, error, sendData } = useAxios({
        lazy: true,
        method: "DELETE",
        url: `/game?id=${props.game.id}`,
        data: {}
    });

    useEffect(() => {
        if (response) {
            toast.success(`El partido ${props.game.id} ha sido eliminado eliminado`);
            props.onSuccess();
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            toast.error(`Ha ocurrido un problema al intentar eliminar el partido`);
            props.onError();
        }
    }, [error]);

    return (
        <>
            <h3><FontAwesomeIcon icon="trash-can" /> Eliminar un partido</h3>
            <MatchHeader game={props.game} />
            <p>
                Por favor, confirme la acci&oacute;n.
            </p>
            <AwesomeButton disabled={loading} loading={loading} onClick={sendData}>
                Eliminar
            </AwesomeButton>
            <AwesomeButton disabled={loading} onClick={props.onCancel} >
                Cancelar
            </AwesomeButton>
        </>
    )
}

export default DeleteGameForm;