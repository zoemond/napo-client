import * as React from "react";
import * as PropTypes from "prop-types";

import { CardSprite } from "../../../components/CardSprite";
import Card from "../../../domain/Card";
import { myPos, getCardWidth, stageSize } from "../pixiStyles";

type DiscardsProp = {
  discards: Card[];
};

export const Discards: React.FC<DiscardsProp> = (props: DiscardsProp) => {
  const discards = props.discards;
  if (!discards) {
    return null;
  }
  const cardWidth = getCardWidth();

  const centerX = stageSize.x - cardWidth;
  const x1 = centerX;
  const x2 = centerX - cardWidth;
  const y = myPos().y;

  const [discard1, discard2] = props.discards;
  return (
    <React.Fragment>
      <CardSprite isDown={discard1.isFaceCard()} card={discard1} x={x1} y={y} />
      <CardSprite isDown={discard2.isFaceCard()} card={discard2} x={x2} y={y} />
    </React.Fragment>
  );
};

Discards.propTypes = {
  discards: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
};
