import { Suit } from "../domain/Suit";
import { TrumpLabel } from "./TrumpLabel";

class SuitValueLabel {
  label: TrumpLabel;
  value: Suit;
  constructor(suit: Suit, label: TrumpLabel) {
    this.label = label;
    this.value = suit;
  }
}

const map = new Map<Suit, TrumpLabel>([
  ["spade", "スペード"],
  ["heart", "ハート"],
  ["diamond", "ダイヤ"],
  ["club", "クラブ"],
]);

export const suitValueLabels = Array.from(map.entries()).map(
  (valLabel) => new SuitValueLabel(valLabel[0], valLabel[1])
);

export const suitToLabel = (suit: Suit): TrumpLabel => map.get(suit);
