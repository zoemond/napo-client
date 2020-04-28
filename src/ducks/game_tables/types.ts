import { GameTablesResponse } from "../../response/GameTablesResponse";

export const GAME_TABLES = "GAME_TABLES";
class ReadTablesAction {
  type = GAME_TABLES;
  payload: GameTablesResponse;
}

export type TGameTablesAction = ReadTablesAction;
// ↑アクションが増えたら↓こうする予定
//  type IActions = IAddChat | IUpdateAction | IDeleteAction
