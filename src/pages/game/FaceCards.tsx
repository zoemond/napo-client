import * as React from "react";
import * as PropTypes from "prop-types";

import Card from "../../domain/Card";
import { CardSprite } from "../../components/CardSprite";
import { handGapWidth, faceCardGapHeight } from "./pixiStyles";

type FaceCardsProp = {
  faceCards: Card[];
  x: number;
  y: number;
  scale?: number;
};
export const FaceCards: React.FC<FaceCardsProp> = (props: FaceCardsProp) => {
  const scale = props.scale || 1;

  return (
    <React.Fragment>
      {props.faceCards.map((card, i) => {
        const y = props.y - faceCardGapHeight(scale);
        return (
          <CardSprite
            key={i}
            card={card}
            x={props.x + i * handGapWidth(scale)}
            y={y}
            scale={scale}
          />
        );
      })}
    </React.Fragment>
  );
};

FaceCards.propTypes = {
  faceCards: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number,
};
