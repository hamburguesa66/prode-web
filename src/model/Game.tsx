import { Team } from "./Team";
import { Competition } from "./Competition";

export interface Game {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    competition: Competition;
    date: Date;
    state: string;
    result: string | undefined;
    homeTeamScore: number | undefined;
    awayTeamScore: number | undefined;
}
