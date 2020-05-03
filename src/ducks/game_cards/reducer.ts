import { GameCardsState } from "./state";
import { TGameCardsAction, GAME_CARDS } from "./types";
import {
  GameCardsResponse,
  GameCardsSuccessResponse,
} from "../../response/GameCardsResponse";
import { ErrorResponse } from "../../response/ErrorResponse";
import GameCards from "../../domain/GameCards";

function gameCardsReducer(
  state: GameCardsState,
  response: GameCardsResponse
): GameCardsState {
  if ((response as ErrorResponse).errorMessage) {
    // TODO: show error
    return state;
  }

  const gameCardsObj = (response as GameCardsSuccessResponse).gameCards;
  return {
    ...state,
    gameCards: new GameCards(
      gameCardsObj.gameTableId,
      gameCardsObj.open,
      gameCardsObj.fieldCards,
      gameCardsObj.seatFirst,
      gameCardsObj.seatSecond,
      gameCardsObj.seatThird,
      gameCardsObj.seatFourth,
      gameCardsObj.seatFifth
    ),
  };
}

export default (
  state: GameCardsState,
  action: TGameCardsAction
): GameCardsState => {
  const response = action.payload;
  switch (action.type) {
    case GAME_CARDS:
      return gameCardsReducer(state, response);
    default:
      return state;
  }
};
