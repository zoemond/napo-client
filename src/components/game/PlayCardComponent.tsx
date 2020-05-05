import * as React from "react";
import * as PropTypes from "prop-types";

import { Sprite, Text } from "@inlet/react-pixi";
import { Seat } from "../../domain/Seat";
import { SeatName } from "../../domain/SeatName";
import { nameStyle } from "./pixiStyles";
import { PlayCardSprite } from "./PlayCardSprite";

const nameHeight = 22;
const cardHight = 212;

type PlayCardProp = {
  getName: (seatName: SeatName) => string;
  seat: Seat;
  baseX: number;
  baseY: number;
};
export const PlayCardComponent: React.FC<PlayCardProp> = (
  props: PlayCardProp
) => {
  const seat = props.seat;
  const textX = props.baseX;
  const textY = props.baseY - nameHeight;
  const cardX = textX;
  const cardY = textY - cardHight;
  return (
    <React.Fragment>
      <PlayCardSprite playCard={seat.playCard} x={cardX} y={cardY} />
      <Text
        text={props.getName(seat.seatName)}
        x={textX}
        y={textY}
        // typescriptのエラーが出る
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        style={nameStyle}
      />
    </React.Fragment>
  );
};

PlayCardComponent.propTypes = {
  getName: PropTypes.func.isRequired,
  seat: PropTypes.instanceOf(Seat).isRequired,
  baseX: PropTypes.number.isRequired,
  baseY: PropTypes.number.isRequired,
};
