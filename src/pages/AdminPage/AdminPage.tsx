import React, { useState } from "react";
import CreateGameForm from "./components/CreateGameForm";
import { useUserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import AdminUserTable from "./components/AdminUserTable";
import CreateTeamForm from "./components/CreateTeamForm";
import CreateCompetitionForm from "./components/CreateCompetitionForm";
import GameAdminSection from "./components/GameAdminSection/GameAdminSection";
import Jumbotron from "../../components/Shared/Jumbotron/Jumbotron";
import Alert from "../../components/Shared/Alert/Alert";

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
                    <Alert type="default">
                    <Jumbotron title="Administración" icon="screwdriver-wrench">
                        Selecciona una acci&oacute;n:
                        <select defaultValue={action} onChange={(e) => changeAction(e)}>
                            {Object.values(AdminPageActions).map(it => <option value={it}>{it}</option>)}
                        </select>
                    </Jumbotron>
                    </Alert>
                    {action === AdminPageActions.Games && <GameAdminSection />}
                    {action === AdminPageActions.CreateTeam && <CreateTeamForm />}
                    {action === AdminPageActions.CreateCompetition && <CreateCompetitionForm />}
                    {action === AdminPageActions.CreateGame && <CreateGameForm />}
                    {action.valueOf() === AdminPageActions.Users && <AdminUserTable />}
                </>
            )}
        </>
    )
}

export default AdminPage;