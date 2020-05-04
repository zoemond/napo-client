const numPattern = /\d+/;
const strPattern = /[a-z]+/;

type Suit = "spade" | "club" | "heart" | "diamond";
function isSuit(str: string): str is Suit {
  return ["spade", "club", "heart", "diamond"].includes(str);
}

export default class Card {
  constructor(suit: Suit, number: number) {
    this.suit = suit;
    this.number = number;
  }
  suit: Suit;
  number: number;

  toStr(): string {
    return this.suit + this.number;
  }

  static fromObj(card: Card): Card {
    return new Card(card.suit, card.number);
  }
}
