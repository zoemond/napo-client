import { Trump } from "./Trump";
import { SeatName } from "./SeatName";
import Card from "./Card";

export class Declaration {
  discards?: [Card, Card];
  faceCardNumber: number;
  trump: Trump;
  napoleon: SeatName;
  aideCard: Card;

  constructor(
    faceCardNumber: number,
    trump: Trump,
    napoleon: SeatName,
    aideCard: Card,
    discards?: [Card, Card]
  ) {
    this.discards = discards;
    this.faceCardNumber = faceCardNumber;
    this.trump = trump;
    this.napoleon = napoleon;
    this.aideCard = aideCard;
  }

  static fromObj(declarationObj: Declaration): Declaration {
    const [discard1, discard2] = declarationObj.discards.map(Card.fromObj);
    const declaration = new Declaration(
      declarationObj.faceCardNumber,
      declarationObj.trump,
      declarationObj.napoleon,
      Card.fromObj(declarationObj.aideCard),
      [discard1, discard2]
    );

    return declaration;
  }

  isDeclared(): boolean {
    return !!this.faceCardNumber;
  }
}
