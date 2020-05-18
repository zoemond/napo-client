import { ErrorResponse } from "./ErrorResponse";
import { Round } from "../domain/Round";

export type RoundSuccessResponse = {
  gameTableId: number;
  round: Round;
};

export type RoundResponse = ErrorResponse | RoundSuccessResponse;
