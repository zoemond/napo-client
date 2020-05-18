import { RoundResponse } from "../../response/RoundResponse";

export const TURN = "TURN";
class ReadRoundAction {
  type = TURN;
  payload: {
    gameTableId: number;
    roundResponse: RoundResponse;
  };
}

export type TRoundAction = ReadRoundAction;
// ↑アクションが増えたら↓こうする予定
//  type IActions = IAddChat | IUpdateAction | IDeleteAction
