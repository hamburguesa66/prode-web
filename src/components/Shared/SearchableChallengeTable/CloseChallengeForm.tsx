import { useEffect } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Challenge } from '../../../model/Challenge';
import useAxios from '../../../hooks/useAxios';
import AwesomeButton from '../AwesomeButton/AwesomeButton';

export interface CloseGameFormProps {
    challenge: Challenge;
    onSuccess: (it: Challenge) => void;
}

const CloseChallengeForm = (props: CloseGameFormProps) => {
    const { loading, response, sendData } = useAxios({
        lazy: true,
        method: "PUT",
        url: `/challenge?id=${props.challenge.id}`,
        data: undefined
    });

    useEffect(() => {
        if (response) {
            toast.success(`El partido ${props.challenge.id} fue actualizado correctamente`);
            props.onSuccess(response.data as Challenge);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    return (
        <>
            <p>
                Loren ipsum
            </p>
            <AwesomeButton disabled={loading} loading={loading} onClick={sendData}>
                <FontAwesomeIcon icon="floppy-disk" /> Guardar
            </AwesomeButton>
        </>
    )
}

export default CloseChallengeForm;