import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Competition } from "../../../model/Competition";
import toast from "react-hot-toast";

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

    useEffect(() => {
        if (response?.data) {
            const data = response.data as Competition;
            toast.success("La competición "+data.id+" fue creada correctamente.");
            setName("");
            setHashtag("");
            setImageUrl("");
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            toast.error("❗ Ha ocurrido un problema: "+error.response?.data);
        }
    }, [error]);

    return (
        <>
            <h3>📝 Crear una competici&oacute;n</h3>
            <p>Complet&aacute; el siguiente formulario para agregar una competici&oacute;n nueva a la base de datos.</p>
            <input type="text" placeholder="Nombre" value={name} onChange={changeName} />
            <input type="text" placeholder="Hashtag" value={hashtag} onChange={changeHashtag} />
            <input type="text" placeholder="Logo" value={imageUrl} onChange={changeImageUrl} />
            <button type="button" onClick={sendData} disabled={loading || name.length === 0 || hashtag.length === 0 || imageUrl.length === 0}>
                {loading && <i className="spin">⌛</i>}{!loading && "Crear competición"}
            </button>
        </>
    )
}

export default CreateCompetitionForm;