import * as React from "react";
import * as PropTypes from "prop-types";

import { CardSprite } from "./CardSprite";
import Card from "../../domain/Card";
import {
  myPos,
  fieldCenter,
  getCardWidth,
  getCardHeight,
  buttonTextStyle,
  stageSize,
} from "./pixiStyles";
import { Text } from "@inlet/react-pixi";

type OpensProp = {
  opens: Card[];
  onOpen: () => void;
  isOpen: boolean;
  isDeclared: boolean;
  isDeclaring: boolean;
};

export const Opens: React.FC<OpensProp> = (props: OpensProp) => {
  if (props.isDeclaring && !props.isDeclared) {
    return null;
  }
  const scale = 0.7;
  const getOpenPos = (): { x: number; y: number } => {
    if (props.isDeclared) {
      return {
        x: stageSize.x - getCardWidth(),
        y: myPos().y,
      };
    }
    return {
      x: fieldCenter.x(scale),
      y: fieldCenter.y(scale),
    };
  };
  const openPos = getOpenPos();
  const x1 = openPos.x + getCardWidth(scale) / 4;
  const x2 = openPos.x - getCardWidth(scale);
  const y1 = openPos.y;
  const y2 = openPos.y;
  const textX = x1 - 22;
  const textY = y1 + getCardHeight(scale) + getCardHeight(scale) / 2;

  const isOpen = props.isOpen;
  const isDown = (card: Card): boolean => {
    if (!isOpen) {
      return true;
    }
    if (!props.isDeclared) {
      return false;
    }
    if (card.number >= 10) {
      return false;
    }
    return true;
  };
  const open1 = props.opens[0];
  const open2 = props.opens[1];
  return (
    <React.Fragment>
      <CardSprite isDown={isDown(open1)} card={open1} x={x1} y={y1} />
      <CardSprite isDown={isDown(open2)} card={open2} x={x2} y={y2} />
      {!isOpen && (
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

Opens.propTypes = {
  opens: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
  onOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  isDeclared: PropTypes.bool,
  isDeclaring: PropTypes.bool,
};
