import { Bet } from "../model/Bet";
import { Game } from "../model/Game";

interface UsePrettifyBetInput {
    game: Game;
    bet?: Bet;
}

const prettyResult = (game: Game, bet?: Bet) => {
    if (bet) {
        switch (bet.gameResult) {
            case 'HOME_TEAM_WON':
                return `Gana ${game.homeTeam.name} (L)`;
            case 'AWAY_TEAM_WON':
                return `Gana ${game.awayTeam.name} (V)`;
            case 'DRAW':
                return `Empate (E)`;
        }
    }
    return 'Ninguna';
}

const prettyType = (bet?: Bet) => {
    if(bet) {
        return 'Clásica (3 puntos)'
    }
    return 'Ninguna';
}

const prettyOutcome = (game: Game, bet?: Bet) : { success: boolean, message: string } => {
    if (bet && game.result) {
        if (bet.gameResult === game.result) {
            return { success: true, message: 'Ganaste 3 puntos' };
        } else {
            return { success: false, message: 'Perdiste' } ;
        }
    }
    return { success: false, message: '' };
}

const usePrettifyBet = (input: UsePrettifyBetInput) => {

    let result = prettyResult(input.game,input.bet);
    let type = prettyType(input.bet);
    let outcome = prettyOutcome(input.game,input.bet);

    return { result, type, outcome };
}

export default usePrettifyBet;