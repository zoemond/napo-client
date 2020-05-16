import Card from "../../domain/Card";
import { Turn } from "../../domain/Turn";

export class TurnState {
  turn: Turn = new Turn(0, [new Card("spade", 0), new Card("spade", 0)]);
}
