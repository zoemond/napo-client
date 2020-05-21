import { SeatsResponse } from "../../response/GameCardsResponse";

export const GAME_CARDS = "GAME_CARDS";
export type ReadSeatsPayLoad = {
  myGameTableId: number;
  response: SeatsResponse;
};
class ReadGameCardsAction {
  type = GAME_CARDS;
  payload: ReadSeatsPayLoad;
}

export type TGameCardsAction = ReadGameCardsAction;
// ↑アクションが増えたら↓こうする予定
//  type IActions = IAddChat | IUpdateAction | IDeleteAction
