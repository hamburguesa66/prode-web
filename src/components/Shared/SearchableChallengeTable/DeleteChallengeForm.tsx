import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Challenge } from "../../../model/Challenge";
import useAxios from "../../../hooks/useAxios";
import AwesomeButton from "../AwesomeButton/AwesomeButton";

export interface DeleteChallengeFormProps {
    challenge: Challenge;
    onSuccess: () => void;
}

const DeleteChallengeForm = (props: DeleteChallengeFormProps) => {
    const [count, setCount] = useState<number>(3);

    const { loading, response, sendData } = useAxios({
        lazy: true,
        method: "DELETE",
        url: `/challenge?id=${props.challenge.id}`,
        data: {}
    });

    useEffect(() => {
        if (response) {
            toast.success(`El desafío #${props.challenge.id} ha sido eliminado correctamente.`);
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
                Loren ipsum.
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

export default DeleteChallengeForm;