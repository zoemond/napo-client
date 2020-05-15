import { SeatName } from "./SeatName";
import Card from "./Card";

export class Turn {
  turnCount: number;
  openCards: [Card, Card];
  isOpened = false;
  state: "completed" | "cheated" | "playing" | "all_green" = "playing";
  winner?: "napoleon_forces" | "allied_forces";
  cheater?: SeatName;

  constructor(turnCount: number, openCards: [Card, Card], isOpened = false) {
    this.turnCount = turnCount;
    this.openCards = openCards;
    this.isOpened = !!isOpened; // reactの型チェックを使えるようにdbの0/1をfalse/trueにします。
  }

  static fromObj(turnObj: Turn): Turn {
    const [open1, open2] = turnObj.openCards.map(Card.fromObj);
    const turn = new Turn(turnObj.turnCount, [open1, open2], turnObj.isOpened);
    turn.state = turnObj.state;
    turn.winner = turnObj.winner;
    turn.cheater = turnObj.cheater;
    return turn;
  }
}
