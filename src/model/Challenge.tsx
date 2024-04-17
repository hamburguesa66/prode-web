import { Competition } from "./Competition";
import { UserScore } from "./UserScore";

export interface Challenge {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    competition: Competition;
    state: string;
    winner: UserScore| undefined;
}
