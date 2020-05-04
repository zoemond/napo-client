import { ErrorResponse } from "./ErrorResponse";
import { Seat } from "../domain/Seat";

export type SeatsSuccessResponse = {
  gameTableId: number;
  seats: Seat[];
};

export type SeatsResponse = ErrorResponse | SeatsSuccessResponse;
