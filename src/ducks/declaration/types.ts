import { DeclarationResponse } from "../../response/DeclarationResponse";

export const DECLARATION = "DECLARATION";
class ReadDeclarationAction {
  type = DECLARATION;
  payload: {
    gameTableId: number;
    declarationResponse: DeclarationResponse;
  };
}

export type TDeclarationAction = ReadDeclarationAction;
// ↑アクションが増えたら↓こうする予定
//  type IActions = IAddChat | IUpdateAction | IDeleteAction
