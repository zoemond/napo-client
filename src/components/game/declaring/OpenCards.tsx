import * as React from "react";
import * as PropTypes from "prop-types";

import { CardSprite } from "../CardSprite";
import Card from "../../../domain/Card";
import {
  fieldCenter,
  getCardWidth,
  getCardHeight,
  buttonTextStyle,
} from "../pixiStyles";
import { Text } from "@inlet/react-pixi";

type OpensProp = {
  opens: Card[];
  onOpen: () => void;
  isOpened: boolean;
};

export const OpenCards: React.FC<OpensProp> = (props: OpensProp) => {
  const scale = 0.7;
  const cardWidth = getCardWidth(scale);
  const cardHeight = getCardHeight(scale);
  const centerX = fieldCenter.x(scale);

  const x1 = centerX + cardWidth / 4;
  const x2 = centerX - cardWidth;
  const y = fieldCenter.y(scale);
  const textX = x1 - 22;
  const textY = y + cardHeight + cardHeight / 2;

  const isNotOpened = !props.isOpened;
  const [open1, open2] = props.opens;
  return (
    <React.Fragment>
      <CardSprite isDown={isNotOpened} card={open1} x={x1} y={y} />
      <CardSprite isDown={isNotOpened} card={open2} x={x2} y={y} />
      {isNotOpened && (
        <Text
          text="開く"
          buttonMode={true}
          interactive={true}
          pointerdown={props.onOpen}
          x={textX}
          y={textY}
          // typescriptのエラーが出る
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          style={buttonTextStyle}
        />
      )}
    </React.Fragment>
  );
};

OpenCards.propTypes = {
  opens: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
  onOpen: PropTypes.func,
  isOpened: PropTypes.bool,
};
