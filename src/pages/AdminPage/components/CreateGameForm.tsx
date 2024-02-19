import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Game } from "../../../model/Game";
import toast from "react-hot-toast";
import { Team } from "../../../model/Team";
import { Competition } from "../../../model/Competition";
import AwesomeButton from "../../../components/Shared/AwesomeButton/AwesomeButton";
import Modal from "react-responsive-modal";
import TeamSelector from "../../../components/Shared/TeamSelector";
import CompetitionSelector from "../../../components/Shared/CompetitionSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TeamLogo from "../../../components/Shared/TeamLogo/TeamLogo";
import CompetitionLogo from "../../../components/Shared/CompetitionLogo/CompetitionLogo";

const CreateGameForm = () => {
    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();
    const [competition, setCompetition] = useState<Competition>();
    const [date, setDate] = useState<string>("");

    const [homeTeamSelectorOpen, setHomeTeamSelectorOpen] = useState<boolean>(false);
    const [awayTeamSelectorOpen, setAwayTeamSelectorOpen] = useState<boolean>(false);
    const [competitionSelectorOpen, setCompetitionSelectorOpen] = useState<boolean>(false);

    const selectHomeTeam = (team: Team) => {
        setHomeTeam(team);
        setHomeTeamSelectorOpen(false);
    };

    const selectAwayTeam = (team: Team) => {
        setAwayTeam(team);
        setAwayTeamSelectorOpen(false);
    };

    const selectCompetiton = (competition: Competition) => {
        setCompetition(competition);
        setCompetitionSelectorOpen(false);
    };

    const changeDate = (e: React.FormEvent<HTMLInputElement>): void => {
        setDate(e.currentTarget.value);
    };

    const { response, error, loading, sendData } = useAxios({
        lazy: true,
        method: "POST",
        url: `/game`,
        data: {
            homeTeamId: homeTeam?.id,
            awayTeamId: awayTeam?.id,
            competitionId: competition?.id,
            date: date,
            timeZone: "America/Argentina/Buenos_Aires"
        }
    });

    const btnDisabled = loading || !homeTeam || !awayTeam || !competition || date.length === 0;

    useEffect(() => {
        if (response?.data) {
            const game = response.data as Game;
            toast.success(`El partido ${game.id} fue creado correctamente`);
            setHomeTeam(undefined);
            setAwayTeam(undefined);
            setCompetition(undefined);
            setDate("");
        }
    }, [response]);

    useEffect(() => {
        if (error) {
            toast.error(`Harry, ha ocurrido un problema. Mirá la consola.`);
        }
    }, [error]);

    const editBtn = (onClick: () => any) => {
        return <AwesomeButton className="no-margin" disabled={loading} onClick={onClick}>
            <FontAwesomeIcon icon="pen-to-square" />
        </AwesomeButton>;
    }

    return (
        <>
            <Modal
                open={homeTeamSelectorOpen}
                onClose={() => setHomeTeamSelectorOpen(false)}
                center>
                <TeamSelector title="Seleccionar Equipo Local" onSelect={selectHomeTeam} />
            </Modal>

            <Modal
                open={awayTeamSelectorOpen}
                onClose={() => setAwayTeamSelectorOpen(false)}
                center>
                <TeamSelector title="Seleccionar Equipo Visitante" onSelect={selectAwayTeam} />
            </Modal>

            <Modal
                open={competitionSelectorOpen}
                onClose={() => setCompetitionSelectorOpen(false)}
                center>
                <CompetitionSelector title="Seleccionar Competencia" onSelect={selectCompetiton} />
            </Modal>

            <h3><FontAwesomeIcon icon="circle-plus" /> Crear un partido</h3>

            <p>Complet&aacute; la informaci&oacute;n del nuevo <FontAwesomeIcon icon="gamepad" /> partido (equipo local -<FontAwesomeIcon icon="l" />-, equipo visitante -<FontAwesomeIcon icon="v" />-, competici&oacute;n -<FontAwesomeIcon icon="trophy" />- y fecha -<FontAwesomeIcon icon="calendar" />-) y hac&eacute; click en el bot&oacute;n "<FontAwesomeIcon icon="plus" /> Crear".</p>

            <div className="basic-table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="text-center"><FontAwesomeIcon icon="l" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="v" /></th>
                            <th className="text-center"><FontAwesomeIcon icon="trophy" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center">
                                <TeamLogo team={homeTeam} showName />
                                {editBtn(() => setHomeTeamSelectorOpen(true))}
                            </td>
                            <td className="text-center">
                                <TeamLogo team={awayTeam} showName />
                                {editBtn(() => setAwayTeamSelectorOpen(true))}
                            </td>
                            <td className="text-center">
                                <CompetitionLogo competition={competition} showName size="32" />
                                {editBtn(() => setCompetitionSelectorOpen(true))}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="text-center">
                                <hr/>
                                <FontAwesomeIcon icon="calendar" />
                                <input className="margin-auto" type="datetime-local" value={date} onChange={changeDate} />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="text-center">
                                <AwesomeButton className="no-margin" loading={loading} disabled={btnDisabled} onClick={sendData}>
                                    <FontAwesomeIcon icon="plus" /> Crear
                                </AwesomeButton>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default CreateGameForm;