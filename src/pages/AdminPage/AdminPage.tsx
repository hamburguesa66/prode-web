import React, { useState } from "react";
import CreateGameForm from "./components/CreateGameForm";
import { useUserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import CreateTeamForm from "./components/CreateTeamForm";
import CreateCompetitionForm from "./components/CreateCompetitionForm";
import GameAdminSection from "./components/GameAdminSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserDashboard from "./components/UserDashboard/UserDashboard";

enum AdminPageActions {
    Games = "Partidos que requieren atención",
    CreateTeam = "Crear un equipo",
    CreateCompetition = "Crear una competición",
    CreateGame = "Crear un partido",
    Users = "Ver usuarios"
}

const AdminPage = () => {
    const { principal } = useUserContext();
    const [action, setAction] = useState<AdminPageActions>(AdminPageActions.Games);

    const changeAction = (e: React.FormEvent<HTMLSelectElement>): void => {
        setAction(e.currentTarget.value as AdminPageActions);
    };

    return (
        <>
            {(!principal.isAuthenticated || !principal.isAdmin) ? (
                <Navigate to="/" replace={true} />
            ) : (
                <>
                    <h2><FontAwesomeIcon icon="screwdriver-wrench" /> Administraci&oacute;n</h2>
                    <p>Fusce diam dolor, aliquam et tortor a, porttitor porta augue. Nulla facilisi. Vestibulum et sem eu nunc imperdiet volutpat ut a lectus. Proin consequat justo luctus nulla sollicitudin elementum. In neque nibh, hendrerit convallis ullamcorper eget, interdum nec nisi. Morbi maximus porttitor ex ac lobortis.</p>
                    <select className="full-width" defaultValue={action} onChange={(e) => changeAction(e)}>
                        {Object.values(AdminPageActions).map(it => <option value={it}>{it}</option>)}
                    </select>
                    {action === AdminPageActions.Games && <GameAdminSection />}
                    {action === AdminPageActions.CreateTeam && <CreateTeamForm />}
                    {action === AdminPageActions.CreateCompetition && <CreateCompetitionForm />}
                    {action === AdminPageActions.CreateGame && <CreateGameForm />}
                    {action.valueOf() === AdminPageActions.Users && <UserDashboard />}
                </>
            )}
        </>
    )
}

export default AdminPage;