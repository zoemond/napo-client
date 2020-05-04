import { SeatName } from "./SeatName";
import Card from "./Card";

export class Turn {
  constructor(turnCount: number, openCards: [Card, Card]) {
    this.turnCount = turnCount;
    this.openCards = openCards;
  }
  turnCount: number;
  openCards: [Card, Card];
  isOpened = false;
  state: "completed" | "cheated" | "playing" | "all_green" = "playing";
  winner?: "napoleon_forces" | "allied_forces";
  cheater?: SeatName;
}
