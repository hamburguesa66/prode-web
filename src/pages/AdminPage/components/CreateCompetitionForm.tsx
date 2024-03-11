import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Competition } from "../../../model/Competition";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwesomeButton from "../../../components/Shared/AwesomeButton/AwesomeButton";

const CreateCompetitionForm = () => {
    const [name, setName] = useState<string>("");
    const [hashtag, setHashtag] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/competition`,
        data: {
            "name": name,
            "hashtag": hashtag,
            "logo": imageUrl
        }
    });

    const changeName = (e: React.FormEvent<HTMLInputElement>): void => {
        setName(e.currentTarget.value);
    };

    const changeHashtag = (e: React.FormEvent<HTMLInputElement>): void => {
        setHashtag(e.currentTarget.value);
    };

    const changeImageUrl = (e: React.FormEvent<HTMLInputElement>) => {
        setImageUrl(e.currentTarget.value);
    }

    const btnDisabled = loading || name.length === 0 || hashtag.length === 0 || imageUrl.length === 0;
    const showPlaceholder = !imageUrl && !name && !hashtag;

    useEffect(() => {
        if (response?.data) {
            const data = response.data as Competition;
            toast.success("La competición " + data.id + " fue creada correctamente.");
            setName("");
            setHashtag("");
            setImageUrl("");
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            toast.error("❗ Ha ocurrido un problema: " + error.response?.data);
        }
    }, [error]);

    return (
        <>
            <h3><FontAwesomeIcon icon="plus-circle" /> Crear una competici&oacute;n</h3>
            <p>Fusce suscipit lobortis sapien, at elementum elit semper sed. Quisque nec nisl lacus. Curabitur a dolor eget quam fermentum venenatis porta eget risus.</p>
            <div className="flex-container">
                <div className="half-width">
                    <input type="text" placeholder="Nombre" value={name} onChange={changeName} />
                    <input type="text" placeholder="Hashtag" value={hashtag} onChange={changeHashtag} />
                    <input type="text" placeholder="Logo" value={imageUrl} onChange={changeImageUrl} />
                    <AwesomeButton onClick={sendData} disabled={btnDisabled} loading={loading}>
                        <FontAwesomeIcon icon="paper-plane" /> Enviar
                    </AwesomeButton>
                </div>
                <div className="half-width flex-skeleton-a">
                    {showPlaceholder && <span>Vista previa</span>}
                    &nbsp;
                    {imageUrl && <img src={imageUrl} alt={name} title={name} height={32} width={32} />}
                    &nbsp;
                    {name && <strong>{name}</strong>}
                    &nbsp;
                    {hashtag && <small>({hashtag})</small>}
                </div>
            </div>
        </>
    )
}

export default CreateCompetitionForm;