import { MyGameState } from "./state";

export const SIT_DOWN = "SIT_DOWN";
export const LEAVE_GAME = "LEAVE_GAME";

export class SitDownAction {
  type = SIT_DOWN;
  payload: MyGameState;
}

export class LeaveGameAction {
  type = LEAVE_GAME;
}
export type TMyGameAction = SitDownAction | LeaveGameAction;
