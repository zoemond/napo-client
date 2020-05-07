import * as React from "react";
import * as PropTypes from "prop-types";

import Card from "../../domain/Card";
import { Text } from "@inlet/react-pixi";
import { CardSprite } from "./CardSprite";
import { nameStyle, getCardHeight, handGapWidth } from "./pixiStyles";

type PlayerCardsProp = {
  hands: Card[];
  x: number;
  y: number;
  name: string;
  isDown?: boolean;
  scale?: number;
};
export const PlayerCards: React.FC<PlayerCardsProp> = (
  props: PlayerCardsProp
) => {
  const nameX = props.x;
  const nameY = props.y;
  const scale = props.scale || 1;
  return (
    <React.Fragment>
      {props.hands.map((card, i) => (
        <CardSprite
          key={i}
          card={card}
          x={props.x + i * handGapWidth(scale)}
          y={props.y}
          isDown={props.isDown}
          scale={scale}
          pointerdown={(e: PIXI.interaction.InteractionEvent): void => {
            console.log(e);
          }}
        />
      ))}
      <Text
        text={props.name}
        x={nameX}
        y={nameY + getCardHeight(scale)}
        // typescriptのエラーが出る
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        style={nameStyle}
      />
    </React.Fragment>
  );
};

PlayerCards.propTypes = {
  hands: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  scale: PropTypes.number,
};
