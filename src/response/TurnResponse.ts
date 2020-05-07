import { ErrorResponse } from "./ErrorResponse";
import { Turn } from "../domain/Turn";

export type TurnSuccessResponse = {
  gameTableId: number;
  turn: Turn;
};

export type TurnResponse = ErrorResponse | TurnSuccessResponse;
