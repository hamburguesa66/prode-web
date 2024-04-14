import { User } from "./User";

export interface UserScore {
    user: User,
    points: number,
    played: number,
    won: number,
    accuracy: number,
}
