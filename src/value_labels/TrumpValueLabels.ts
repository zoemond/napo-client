import { Trump } from "../domain/Trump";
import { TrumpLabel } from "./TrumpLabel";

class TrumpValueLabel {
  label: TrumpLabel;
  value: Trump;
  constructor(trump: Trump, label: TrumpLabel) {
    this.label = label;
    this.value = trump;
  }
}

const map = new Map<Trump, TrumpLabel>([
  ["no_trump", "ノートラ"],
  ["spade", "スペード"],
  ["heart", "ハート"],
  ["diamond", "ダイヤ"],
  ["club", "クラブ"],
]);

export const trumpValueLabels = Array.from(map.entries()).map(
  (valLabel) => new TrumpValueLabel(valLabel[0], valLabel[1])
);

export const trumpToLabel = (trump: Trump): TrumpLabel => map.get(trump);
