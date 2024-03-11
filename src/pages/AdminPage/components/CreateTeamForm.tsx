import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Team } from "../../../model/Team";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwesomeButton from "../../../components/Shared/AwesomeButton/AwesomeButton";

const CreateTeamForm = () => {
    const [name, setName] = useState<string>("");
    const [shortName, setShortName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const { response, loading, error, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/team`,
        data: {
            "name": name,
            "shortName": shortName,
            "logo": imageUrl
        }
    });

    const changeName = (e: React.FormEvent<HTMLInputElement>): void => {
        setName(e.currentTarget.value);
    };

    const changeShortName = (e: React.FormEvent<HTMLInputElement>) => {
        setShortName(e.currentTarget.value);
    }

    const changeImageUrl = (e: React.FormEvent<HTMLInputElement>) => {
        setImageUrl(e.currentTarget.value);
    }

    const btnDisabled = loading || name.length === 0 || shortName.length === 0 || imageUrl.length === 0;
    const showPlaceholder = !imageUrl && !name && !shortName;

    useEffect(() => {
        if (response?.data) {
            const data = response.data as Team;
            toast.success("El equipo " + data.id + " fue creado correctamente.");
            setName("");
            setShortName("");
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
            <h3><FontAwesomeIcon icon="plus-circle" /> Crear un equipo</h3>
            <p>Integer nec orci sed lectus tempus hendrerit. Duis eros odio, viverra vel libero at, iaculis euismod magna. Aenean ut nunc vel metus malesuada dignissim. Maecenas auctor sed lectus vel laoreet.</p>
            <div className="flex-container">
                <div className="half-width">
                    <input type="text" placeholder="Nombre" value={name} onChange={changeName} />
                    <input type="text" placeholder="Nombre (corto)" value={shortName} onChange={changeShortName} />
                    <input type="text" placeholder="Escudo" value={imageUrl} onChange={changeImageUrl} />
                    <AwesomeButton onClick={sendData} disabled={btnDisabled} loading={loading}>
                        <FontAwesomeIcon icon="paper-plane"/> Enviar
                    </AwesomeButton>
                </div>
                <div className="half-width flex-skeleton-a">
                    {showPlaceholder && <span>Vista previa</span>}
                    &nbsp;
                    {imageUrl && <img src={imageUrl} alt={name} title={name} height={32} width={32} />}
                    &nbsp;
                    {name && <strong>{name}</strong>}
                    &nbsp;
                    {shortName && <small>({shortName})</small>}
                </div>
            </div >
        </>
    )
}

export default CreateTeamForm;