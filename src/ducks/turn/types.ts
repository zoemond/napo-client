import { TurnResponse } from "../../response/TurnResponse";

export const TURN = "TURN";
class ReadTurnAction {
  type = TURN;
  payload: {
    gameTableId: number;
    turnResponse: TurnResponse;
  };
}

export type TTurnAction = ReadTurnAction;
// ↑アクションが増えたら↓こうする予定
//  type IActions = IAddChat | IUpdateAction | IDeleteAction
