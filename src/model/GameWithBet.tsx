import { Game } from "./Game";
import { Bet } from "./Bet";

export interface GameWithBet {
    game: Game;
    bet: Bet | undefined;
}
