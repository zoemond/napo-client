import * as React from "react";
import * as PropTypes from "prop-types";

import { Sprite } from "@inlet/react-pixi";
import Card from "../../domain/Card";

type PlayCardSpriteProp = {
  playCard: Card;
  x: number;
  y: number;
};
export const PlayCardSprite: React.FC<PlayCardSpriteProp> = (
  props: PlayCardSpriteProp
) => {
  const playCard = props.playCard;
  return (
    <React.Fragment>
      {playCard && (
        <Sprite
          image={`src/assets/cards/${playCard.toStr()}.png`}
          x={props.x}
          y={props.y}
        />
      )}
    </React.Fragment>
  );
};

PlayCardSprite.propTypes = {
  playCard: PropTypes.instanceOf(Card),
  x: PropTypes.number,
  y: PropTypes.number,
};
