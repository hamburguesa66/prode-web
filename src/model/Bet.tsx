export interface Bet {
    id: number;
    userUuid: string | undefined;
    gameId: number;
    gameResult: string;
    date: Date;
}
