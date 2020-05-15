import * as React from "react";
import * as PropTypes from "prop-types";

import { getCardWidth, getCardHeight } from "../pixiStyles";
import { CardSprite } from "../CardSprite";
import MyGameSight from "../../../domain/MyGameSight";

type PlayingFieldProp = {
  sight: MyGameSight;
  x: number;
  y: number;
};
export const PlayingField: React.FC<PlayingFieldProp> = (
  props: PlayingFieldProp
) => {
  const sight = props.sight;

  const cardScale = 0.7;

  const cardWidth = getCardWidth(cardScale);
  const cardHeight = getCardHeight(cardScale);
  // x
  const myX = props.x;
  const rightX = myX - cardWidth;
  const frontRightX = myX - cardWidth / 2;
  const frontLeftX = myX + cardWidth / 2;
  const leftX = myX + cardWidth;

  // y
  const myY = props.y + cardHeight + cardHeight / 2;
  const secondRowY = myY - cardHeight / 4;
  const firstRowY = secondRowY - cardHeight;

  return (
    <React.Fragment>
      <CardSprite
        scale={cardScale}
        card={sight.mySeat.playCard}
        x={myX}
        y={myY}
      />
      <CardSprite
        scale={cardScale}
        card={sight.rightCard()}
        x={rightX}
        y={secondRowY}
      />
      <CardSprite
        scale={cardScale}
        card={sight.frontRightCard()}
        x={frontRightX}
        y={firstRowY}
      />
      <CardSprite
        scale={cardScale}
        card={sight.frontLeftCard()}
        x={frontLeftX}
        y={firstRowY}
      />
      <CardSprite
        scale={cardScale}
        card={sight.leftCard()}
        x={leftX}
        y={secondRowY}
      />
    </React.Fragment>
  );
};

PlayingField.propTypes = {
  sight: PropTypes.instanceOf(MyGameSight).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};
