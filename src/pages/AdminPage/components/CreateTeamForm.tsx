import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Team } from "../../../model/Team";

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

    useEffect(() => {
        if (response?.data) {
            const data = response.data as Team;
            alert("El equipo "+data.id+" fue creado correctamente.");
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            alert("❗ Ha ocurrido un problema: "+error.response?.data);
        }
    }, [error]);

    return (
        <>
            <h3>📝 Crear un equipo</h3>
            <p>Complet&aacute; el siguiente formulario para agregar un equipo nuevo a la base de datos.</p>
            <input type="text" placeholder="Nombre" value={name} onChange={changeName} />
            <input type="text" placeholder="Nombre (corto)" value={shortName} onChange={changeShortName} />
            <input type="text" placeholder="Escudo" value={imageUrl} onChange={changeImageUrl} />
            <button type="button" onClick={sendData} disabled={loading || name.length === 0 || shortName.length === 0 || imageUrl.length === 0}>
                {loading && <i className="spin">⌛</i>}{!loading && "Crear equipo"}
            </button>
        </>
    )
}

export default CreateTeamForm;