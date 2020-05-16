import { TurnState } from "./state";
import { TTurnAction, TURN } from "./types";
import { ErrorResponse } from "../../response/ErrorResponse";
import { TurnResponse, TurnSuccessResponse } from "../../response/TurnResponse";
import { Turn } from "../../domain/Turn";

function turnReducer(
  state: TurnState,
  payload: { gameTableId: number; turnResponse: TurnResponse }
): TurnState {
  const response = payload.turnResponse;
  if ((response as ErrorResponse).errorMessage) {
    // TODO: show error
    return state;
  }
  const turnResponse = response as TurnSuccessResponse;
  if (turnResponse.gameTableId !== payload.gameTableId) {
    return state;
  }
  if (!turnResponse.turn || !turnResponse.turn.openCards) {
    return state;
  }

  const turn = Turn.fromObj(turnResponse.turn);
  return {
    ...state,
    turn,
  };
}

export default (state: TurnState, action: TTurnAction): TurnState => {
  const payload = action.payload;
  switch (action.type) {
    case TURN:
      return turnReducer(state, payload);
    default:
      return state;
  }
};
