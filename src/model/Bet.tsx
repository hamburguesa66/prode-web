export interface Bet {
    id: number;
    userUuid: string | undefined;
    gameId: number;
    gameResult: string;
    betType: string;
    date: Date;
}
