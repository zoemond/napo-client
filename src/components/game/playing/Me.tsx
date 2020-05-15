import * as React from "react";
import * as PropTypes from "prop-types";

import { myPos } from "../pixiStyles";
import { PlayerCards } from "../PlayerCards";
import Card from "../../../domain/Card";

const initialDiscard = new Card("spade", 0);
type MeProp = {
  hands: Card[];
  name: string;
  isMyTurn: boolean;
  onDiscard: (discards: Card) => void;
};
export const Me: React.FC<MeProp> = (props: MeProp) => {
  const [discard, setDiscard] = React.useState(initialDiscard);

  return (
    <PlayerCards
      hands={props.hands}
      x={myPos().x}
      y={myPos().y}
      selectedCards={[discard]}
      name={props.name}
      pointerdown={(card: Card): void => {
        console.log(card);
        if (!discard.equals(card)) {
          setDiscard(card);
          return;
        }
        if (props.isMyTurn) {
          props.onDiscard(card);
        }
      }}
    />
  );
};

Me.propTypes = {
  hands: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
  name: PropTypes.string.isRequired,
};
