import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { Competition } from "../../../model/Competition";
import AwesomeButton from "../../../components/Shared/AwesomeButton/AwesomeButton";
import Modal from "react-responsive-modal";
import CompetitionSelector from "../../../components/Shared/CompetitionSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Challenge } from "../../../model/Challenge";

const CreateChallengeForm = () => {
    const [name, setName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [withCompetition, setWithCompetition] = useState<boolean>(false);
    const [competition, setCompetition] = useState<Competition>();
    const [competitionSelectorOpen, setCompetitionSelectorOpen] = useState<boolean>(false);

    const selectCompetiton = (competition: Competition) => {
        setCompetition(competition);
        setCompetitionSelectorOpen(false);
    };

    const changeName = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        setName(e.currentTarget.value);
    };

    const changeStartDate = (e: React.FormEvent<HTMLInputElement>): void => {
        setStartDate(e.currentTarget.value);
    };

    const changeEndDate = (e: React.FormEvent<HTMLInputElement>): void => {
        setEndDate(e.currentTarget.value);
    };

    const { response, loading, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/challenge`,
        data: {
            name: name,
            startDate: startDate,
            endDate: endDate,
            competitionId: withCompetition ? competition?.id : undefined,
            timeZone: "America/Argentina/Buenos_Aires"
        }
    });

    const btnDisabled = loading || !startDate || !endDate || (withCompetition && !competition) || !name;

    useEffect(() => {
        if (response?.data) {
            const challenge = response.data as Challenge;
            toast.success(`El desafio ${challenge.id} fue creado correctamente`);
            setName("");
            setStartDate("");
            setEndDate("");
            setWithCompetition(false);
            setCompetition(undefined);
        }
    }, [response]);

    return (
        <>
            <Modal
                open={competitionSelectorOpen}
                onClose={() => setCompetitionSelectorOpen(false)}
                center>
                <CompetitionSelector title="Seleccionar Competencia" onSelect={selectCompetiton} />
            </Modal>

            <h3><FontAwesomeIcon icon="circle-plus" /> Crear un desaf&iacute;o</h3>

            <p>Nulla sem mi, imperdiet quis quam ut, accumsan dapibus lacus. Donec maximus magna erat, et semper libero molestie ut. Nunc in turpis ligula.</p>

            <p>
                <strong>Nombre:</strong>
                <textarea placeholder="Ninguno" rows={1} value={name} onChange={changeName} maxLength={150} />
            </p>

            <div className="flex-container">
                <div className="half-width">
                    <strong>Fecha desde:</strong>
                    <input className="full-width-input" type="datetime-local" value={startDate} onChange={changeStartDate} />
                </div>
                <div className="half-width ml-5">
                    <strong>Fecha hasta:</strong>
                    <input className="full-width-input" type="datetime-local" value={endDate} onChange={changeEndDate} />
                </div>
            </div>

            <p>
                <label>
                    <input type="checkbox" checked={withCompetition} onChange={() => setWithCompetition(!withCompetition)} />
                    Usar competici&oacute;n
                </label>
            </p>

            <p>
                <div className="flex-container flex-container-input">
                    <div>
                        <input type="text" disabled={!withCompetition} value={competition?.name || "Ninguna"} readOnly={true} />
                    </div>
                    <div>
                        <AwesomeButton className="full-width" onClick={() => setCompetitionSelectorOpen(true)}>
                            <FontAwesomeIcon icon="pen-to-square" />
                        </AwesomeButton>
                    </div>
                </div>
            </p>

            <AwesomeButton loading={loading} disabled={btnDisabled} onClick={sendData}>
                <FontAwesomeIcon icon="plus" /> Crear
            </AwesomeButton>
        </>
    )
}

export default CreateChallengeForm;