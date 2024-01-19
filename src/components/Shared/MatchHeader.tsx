import dayjs from "dayjs";
import './MatchHeader.css';
import { Game } from "../../model/Game";
import { Team } from "../../model/Team";

export interface MatchHeaderProps {
    game: Game;
}

const MatchHeader = (props: MatchHeaderProps) => {

    const buildTeamImg = (team: Team) => {
        return <img
            className="match-header-v-align-middle" alt={team.name} src={team.logo} />
    }

    const buildTeamAbbr = (team: Team) => {
        return <abbr
            className="match-header-v-align-middle" title={team.name}>{team.shortName}
        </abbr>
    }

    return (
        <div className="match-header-container">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={3} className="match-header-td-centered">
                            🗓️ {dayjs(props.game.date).format("DD/MM HH:mm")}
                        </td>
                    </tr>
                    <tr>
                        <td className="match-header-td-right">
                            {buildTeamImg(props.game.homeTeam)}
                            &nbsp;
                            {buildTeamAbbr(props.game.homeTeam)}
                        </td>
                        <td className="match-header-td-centered match-header-v-align-middle">
                            🆚
                        </td>
                        <td className="match-header-td-left">
                            {buildTeamAbbr(props.game.awayTeam)}
                            &nbsp;
                            {buildTeamImg(props.game.awayTeam)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="match-header-td-centered">
                            <img className="match-header-v-align-middle" 
                                width={16} height={16} src={props.game.competition.logo} />
                            &nbsp;
                            <small>{props.game.competition.name}</small>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default MatchHeader;