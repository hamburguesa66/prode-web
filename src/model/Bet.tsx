export interface Bet {
    id: number;
    userUuid: string | undefined;
    gameId: number;
    result: string;
    date: Date;
}
