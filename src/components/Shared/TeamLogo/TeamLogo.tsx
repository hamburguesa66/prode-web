import './TeamLogo.css';
import { Team } from "../../../model/Team";

export interface TeamLogoProps {
    team: Team | undefined;
    showName?: boolean;
}

const TeamLogo = (props: TeamLogoProps) => {
    return (
        <>
            {props.team ? (
                <>
                    <img src={props.team.logo} alt={props.team.name} title={props.team.name} />
                    {props.showName && <p className="team-logo-name">{props.team.name}</p>}
                </>
            ) : (
                <>-<br /></>
            )}
        </>
    )
}

export default TeamLogo;