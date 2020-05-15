import * as React from "react";
import * as PropTypes from "prop-types";

import Card from "../../domain/Card";
import { Text } from "@inlet/react-pixi";
import { CardSprite } from "../../components/CardSprite";
import { nameStyle, getCardHeight, handGapWidth } from "./pixiStyles";

type PlayerCardsProp = {
  hands: Card[];
  x: number;
  y: number;
  name: string;
  selectedCards?: Card[];
  isDown?: boolean;
  scale?: number;
  pointerdown?: (card: Card) => void;
};
export const PlayerCards: React.FC<PlayerCardsProp> = (
  props: PlayerCardsProp
) => {
  const nameX = props.x;
  const nameY = props.y;
  const scale = props.scale || 1;
  const isSelected = (card: Card): boolean => {
    if (!props.selectedCards) {
      return false;
    }
    return !!props.selectedCards.find((c) => c.toStr() === card.toStr());
  };
  return (
    <React.Fragment>
      {props.hands.map((card, i) => {
        const y = isSelected(card) ? props.y - 20 * scale : props.y;
        return (
          <CardSprite
            key={i}
            card={card}
            x={props.x + i * handGapWidth(scale)}
            y={y}
            isDown={props.isDown}
            scale={scale}
            pointerdown={props.pointerdown}
          />
        );
      })}
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
  selectedCards: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
  scale: PropTypes.number,
  pointerdown: PropTypes.func,
};
