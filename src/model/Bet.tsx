export enum BetType {
   CLASSIC = "CLASSIC",
   DOUBLE_CHANCE = "DOUBLE_CHANCE"
}

export interface Bet {
    id: number;
    userUuid: string | undefined;
    gameId: number;
    gameResult: string;
    type: BetType;
    date: Date;
    isWinningBet: boolean | undefined;
}
