import * as React from "react";
import * as PropTypes from "prop-types";

import MyGameSight from "../../domain/MyGameSight";
import { rightPos, leftPos, frontLeftPos, frontRightPos } from "./pixiStyles";
import { PlayerCards } from "./PlayerCards";
import { SeatName } from "../../domain/SeatName";

const notMyHandsScale = 0.6;

type GamePageProp = {
  gameSight: MyGameSight;
  findName: (seatName: SeatName) => string;
  isShowCards?: boolean;
};

export const CoPlayer: React.FC<GamePageProp> = (props: GamePageProp) => {
  const myGameSight = props.gameSight;
  const findName = props.findName;
  if (!myGameSight.mySeat) {
    return null;
  }
  const isDown = !props.isShowCards;
  return (
    <React.Fragment>
      <PlayerCards
        hands={myGameSight.leftSeat.hands}
        faceCards={myGameSight.leftSeat.faceCards}
        x={leftPos(notMyHandsScale).x}
        y={leftPos(notMyHandsScale).y}
        isDown={isDown}
        scale={notMyHandsScale}
        name={findName(myGameSight.leftSeat.seatName)}
      />
      <PlayerCards
        hands={myGameSight.frontLeftSeat.hands}
        faceCards={myGameSight.frontLeftSeat.faceCards}
        x={frontLeftPos(notMyHandsScale).x}
        y={frontLeftPos(notMyHandsScale).y}
        isDown={isDown}
        scale={notMyHandsScale}
        name={findName(myGameSight.frontLeftSeat.seatName)}
      />
      <PlayerCards
        hands={myGameSight.frontRightSeat.hands}
        faceCards={myGameSight.frontRightSeat.faceCards}
        x={frontRightPos(notMyHandsScale).x}
        y={frontRightPos(notMyHandsScale).y}
        isDown={isDown}
        scale={notMyHandsScale}
        name={findName(myGameSight.frontRightSeat.seatName)}
      />
      <PlayerCards
        hands={myGameSight.rightSeat.hands}
        faceCards={myGameSight.rightSeat.faceCards}
        x={rightPos(notMyHandsScale).x}
        y={rightPos(notMyHandsScale).y}
        isDown={isDown}
        scale={notMyHandsScale}
        name={findName(myGameSight.rightSeat.seatName)}
      />
    </React.Fragment>
  );
};

CoPlayer.propTypes = {
  gameSight: PropTypes.instanceOf(MyGameSight).isRequired,
  findName: PropTypes.func.isRequired,
  isShowCards: PropTypes.bool,
};
