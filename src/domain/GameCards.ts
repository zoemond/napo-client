import Card from "./Card";

export default class GameCards {
  constructor(
    gameTableId: number,
    [open1, open2]: [Card, Card],
    fieldCards: Card[],
    seatFirst: Card[],
    seatSecond: Card[],
    seatThird: Card[],
    seatFourth: Card[],
    seatFifth: Card[]
  ) {
    this.gameTableId = gameTableId;
    this.open = [
      new Card(open1.suit, open1.number),
      new Card(open2.suit, open2.number),
    ];
    this.fieldCards = this.toCards(fieldCards);
    this.seatFirst = this.toCards(seatFirst);
    this.seatSecond = this.toCards(seatSecond);
    this.seatThird = this.toCards(seatThird);
    this.seatFourth = this.toCards(seatFourth);
    this.seatFifth = this.toCards(seatFifth);
  }

  gameTableId: number;
  open: [Card, Card];
  fieldCards: Card[];
  seatFirst: Card[];
  seatSecond: Card[];
  seatThird: Card[];
  seatFourth: Card[];
  seatFifth: Card[];

  private toCards(cardObjList: Card[]): Card[] {
    return cardObjList.map((cardObj) => new Card(cardObj.suit, cardObj.number));
  }
}
