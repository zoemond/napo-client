import { GameState } from "./state";
import { TGameCardsAction, GAME_CARDS } from "./types";
import {
  SeatsResponse,
  SeatsSuccessResponse,
} from "../../response/GameCardsResponse";
import { ErrorResponse } from "../../response/ErrorResponse";
import { Seat } from "../../domain/Seat";

function gameCardsReducer(
  state: GameState,
  response: SeatsResponse
): GameState {
  if ((response as ErrorResponse).errorMessage) {
    // TODO: show error
    return state;
  }

  const seats = (response as SeatsSuccessResponse).seats;
  return {
    ...state,
    seats: seats.map((seat) => Seat.from(seat)),
  };
}

export default (state: GameState, action: TGameCardsAction): GameState => {
  const response = action.payload;
  switch (action.type) {
    case GAME_CARDS:
      return gameCardsReducer(state, response);
    default:
      return state;
  }
};
