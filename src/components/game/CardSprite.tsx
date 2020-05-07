import * as React from "react";
import * as PropTypes from "prop-types";

import { Sprite } from "@inlet/react-pixi";
import Card from "../../domain/Card";

type CardSpriteProp = {
  card: Card;
  x: number;
  y: number;
  scale?: number;
  isDown?: boolean;
  pointerdown?: (e: PIXI.interaction.InteractionEvent) => void;
};
export const CardSprite: React.FC<CardSpriteProp> = (props: CardSpriteProp) => {
  const card = props.card;
  if (!card) {
    return null;
  }
  const cardName = props.isDown ? "back" : card.toStr();
  return (
    <Sprite
      image={`src/assets/cards/${cardName}.png`}
      x={props.x}
      y={props.y}
      scale={props.scale || 1}
      interactive={!!props.pointerdown}
      pointerdown={props.pointerdown}
    />
  );
};

CardSprite.propTypes = {
  card: PropTypes.instanceOf(Card),
  x: PropTypes.number,
  y: PropTypes.number,
  isDown: PropTypes.bool,
  scale: PropTypes.number,
};
