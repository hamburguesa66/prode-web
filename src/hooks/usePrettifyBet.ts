import { Bet } from "../model/Bet";
import { Game } from "../model/Game";

interface UsePrettifyBetInput {
  game: Game;
  bet?: Bet;
}

const prettyResult = (game: Game, bet?: Bet) => {
  if (bet) {
    if (bet.type === "CLASSIC") {
      switch (bet.gameResult) {
        case "HOME_TEAM_WON":
          return `Gana ${game.homeTeam.name} (L)`;
        case "AWAY_TEAM_WON":
          return `Gana ${game.awayTeam.name} (V)`;
        case "DRAW":
          return `Empate (E)`;
      }
    }
    else if (bet.type === "DOUBLE_CHANCE") {
      switch (bet.gameResult) {
        case "AWAY_TEAM_WON":
          return `Gana o Empate ${game.homeTeam.name} (L)`;
        case "HOME_TEAM_WON":
          return `Gana o Empate ${game.awayTeam.name} (V)`;
        case "DRAW":
          return `Gana ${game.homeTeam.name} (L) o Gana ${game.awayTeam.name} (V)`;
      }
    }
  }
  return "Ninguna";
};

const prettyType = (bet?: Bet) => {
  if (bet?.type === "CLASSIC") {
    return "Clásica (3 puntos)";
  } else if (bet?.type === "DOUBLE_CHANCE") {
    return "Doble oportunidad (1 puntos)";

  }
  return "Ninguna";
};

const prettyOutcome = (
  game: Game,
  bet?: Bet
): { success: boolean; message: string } => {
  if (bet && game.result) {
    if (bet?.type === "CLASSIC" && bet.gameResult === game.result) {
      return { success: true, message: "Ganaste 3 puntos" };
    } else if (bet?.type === "DOUBLE_CHANCE" && bet.gameResult !== game.result) {
        return { success: true, message: "Ganaste 1 punto" };
    }
    else{
      return { success: false, message: "Perdiste" };
    }
  }
  return { success: false, message: "" };
};

const usePrettifyBet = (input: UsePrettifyBetInput) => {
  let result = prettyResult(input.game, input.bet);
  let type = prettyType(input.bet);
  let outcome = prettyOutcome(input.game, input.bet);

  return { result, type, outcome };
};

export default usePrettifyBet;
