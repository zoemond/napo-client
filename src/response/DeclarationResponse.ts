import { ErrorResponse } from "./ErrorResponse";
import { Declaration } from "../domain/Declaration";

export type DeclarationSuccessResponse = {
  gameTableId: number;
  declaration: Declaration;
};

export type DeclarationResponse = ErrorResponse | DeclarationSuccessResponse;
