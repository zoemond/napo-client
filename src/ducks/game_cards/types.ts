import { GameCardsResponse } from "../../response/GameCardsResponse";

export const GAME_CARDS = "GAME_CARDS";
class ReadGameCardsAction {
  type = GAME_CARDS;
  payload: GameCardsResponse;
}

export type TGameCardsAction = ReadGameCardsAction;
// ↑アクションが増えたら↓こうする予定
//  type IActions = IAddChat | IUpdateAction | IDeleteAction
