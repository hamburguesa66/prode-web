import { useEffect } from "react";
import toast from "react-hot-toast";
import MatchHeader from "../../../../components/Shared/MatchHeader";
import { Game } from "../../../../model/Game";
import useAxios from "../../../../hooks/useAxios";

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
            <h3>🎲 Eliminar un partido</h3>
            <MatchHeader game={props.game} />
            <p>
                Confirme la acci&oacute;n. No hay vuelta atr&aacute;s ...
            </p>
            <button type="button" disabled={loading } onClick={sendData}>
                {loading && <i className="spin">⌛</i>}{!loading && "Eliminar"}
            </button>
            <button type="button" disabled={loading} onClick={props.onCancel}>
                Cancelar
            </button>
        </>
    )
}

export default DeleteGameForm;