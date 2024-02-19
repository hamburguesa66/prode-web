import './CompetitionLogo.css';
import { Competition } from '../../../model/Competition';

export interface CompetitionLogoProps {
    competition: Competition | undefined;
    size: "32" | "64";
    showName?: boolean;
}

const CompetitionLogo = (props: CompetitionLogoProps) => {
    return (
        <>
            {props.competition ? (
                <>
                    <img width={props.size} height={props.size} 
                        src={props.competition.logo} 
                        alt={props.competition.name} 
                        title={props.competition.name} />
                    {props.showName && <p className="competition-logo-name">{props.competition.name}</p>}
                </>
            ) : (
                <>-<br /></>
            )}
        </>
    )
}

export default CompetitionLogo;