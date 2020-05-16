import { DeclarationState } from "./state";
import { TDeclarationAction, DECLARATION } from "./types";
import { ErrorResponse } from "../../response/ErrorResponse";
import {
  DeclarationResponse,
  DeclarationSuccessResponse,
} from "../../response/DeclarationResponse";
import { Declaration } from "../../domain/Declaration";

function declarationReducer(
  state: DeclarationState,
  payload: { gameTableId: number; declarationResponse: DeclarationResponse }
): DeclarationState {
  const response = payload.declarationResponse;
  if ((response as ErrorResponse).errorMessage) {
    // TODO: show error
    return state;
  }
  const declarationResponse = response as DeclarationSuccessResponse;
  if (declarationResponse.gameTableId !== payload.gameTableId) {
    return state;
  }
  if (!declarationResponse.declaration) {
    return state;
  }

  const declaration = Declaration.fromObj(declarationResponse.declaration);
  return {
    ...state,
    declaration,
  };
}

export default (
  state: DeclarationState,
  action: TDeclarationAction
): DeclarationState => {
  const payload = action.payload;
  switch (action.type) {
    case DECLARATION:
      return declarationReducer(state, payload);
    default:
      return state;
  }
};
