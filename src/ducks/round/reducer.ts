import { RoundState } from "./state";
import { TRoundAction, TURN } from "./types";
import { ErrorResponse } from "../../response/ErrorResponse";
import {
  RoundResponse,
  RoundSuccessResponse,
} from "../../response/RoundResponse";
import { Round } from "../../domain/Round";

function roundReducer(
  state: RoundState,
  payload: { gameTableId: number; roundResponse: RoundResponse }
): RoundState {
  const response = payload.roundResponse;
  if ((response as ErrorResponse).errorMessage) {
    // TODO: show error
    return state;
  }
  const roundResponse = response as RoundSuccessResponse;
  if (roundResponse.gameTableId !== payload.gameTableId) {
    return state;
  }
  if (!roundResponse.round || !roundResponse.round.openCards) {
    return state;
  }

  const round = Round.fromObj(roundResponse.round);
  return {
    ...state,
    round,
  };
}

export default (state: RoundState, action: TRoundAction): RoundState => {
  const payload = action.payload;
  switch (action.type) {
    case TURN:
      return roundReducer(state, payload);
    default:
      return state;
  }
};
