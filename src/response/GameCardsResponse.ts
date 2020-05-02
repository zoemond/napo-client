import GameCards from "../domain/GameCards";
import { ErrorResponse } from "./ErrorResponse";

export type GameCardsSuccessResponse = {
  gameCards: GameCards;
};

export type GameCardsResponse = ErrorResponse | GameCardsSuccessResponse;
