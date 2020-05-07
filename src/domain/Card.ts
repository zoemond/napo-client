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

  static fromStr(cardStr: string): Card {
    const matchedStrings = cardStr.match(strPattern);
    const matchedNumbers = cardStr.match(numPattern);
    if (!matchedStrings || !matchedNumbers) {
      throw new Error("not card string: " + cardStr);
    }
    const suit = matchedStrings[0];
    const number = parseInt(matchedNumbers[0]);
    if (!isSuit(suit) || isNaN(number)) {
      throw new Error("not card string: " + cardStr);
    }
    return new Card(suit, number);
  }
}
