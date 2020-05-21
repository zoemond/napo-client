import { Seats } from "./state";
import { TGameCardsAction, GAME_CARDS, ReadSeatsPayLoad } from "./types";
import { SeatsSuccessResponse } from "../../response/GameCardsResponse";
import { ErrorResponse } from "../../response/ErrorResponse";
import { Seat } from "../../domain/Seat";

function gameCardsReducer(state: Seats, payload: ReadSeatsPayLoad): Seats {
  const successResponse = payload.response as SeatsSuccessResponse;
  if (successResponse.gameTableId !== payload.myGameTableId) {
    // TODO: 今の所すべてのゲームの状態がブロードキャストされてくるのでどうにかする
    return state;
  }
  if ((payload.response as ErrorResponse).errorMessage) {
    // TODO: show error
    return state;
  }

  return {
    ...state,
    seats: successResponse.seats.map((seat) => Seat.from(seat)),
  };
}

export default (state: Seats, action: TGameCardsAction): Seats => {
  const response = action.payload;
  switch (action.type) {
    case GAME_CARDS:
      return gameCardsReducer(state, response);
    default:
      return state;
  }
};
