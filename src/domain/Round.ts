import { SeatName } from "./SeatName";
import Card from "./Card";

export class Round {
  roundCount: number;
  openCards: [Card, Card];
  isOpened = false;
  state: "completed" | "cheated" | "playing" | "all_green" = "playing";
  winner?: "napoleon_forces" | "allied_forces";
  cheater?: SeatName;

  constructor(roundCount: number, openCards: [Card, Card], isOpened = false) {
    this.roundCount = roundCount;
    this.openCards = openCards;
    this.isOpened = !!isOpened; // reactの型チェックを使えるようにdbの0/1をfalse/trueにします。
  }

  static fromObj(roundObj: Round): Round {
    const [open1, open2] = roundObj.openCards.map(Card.fromObj);
    const round = new Round(
      roundObj.roundCount,
      [open1, open2],
      roundObj.isOpened
    );
    round.state = roundObj.state;
    round.winner = roundObj.winner;
    round.cheater = roundObj.cheater;
    return round;
  }
}
