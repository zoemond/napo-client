import Card from "../../domain/Card";
import { Round } from "../../domain/Round";

export class RoundState {
  round: Round = new Round(0, [new Card("spade", 0), new Card("spade", 0)]);
}
