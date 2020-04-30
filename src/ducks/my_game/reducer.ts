import { MyGameState } from "./state";
import { SIT_DOWN, LEAVE_GAME, TMyGameAction, SitDownAction } from "./types";

export default (state: MyGameState, action: TMyGameAction): MyGameState => {
  switch (action.type) {
    case SIT_DOWN:
      return (action as SitDownAction).payload;
    case LEAVE_GAME:
      return new MyGameState();
    default:
      return state;
  }
};
