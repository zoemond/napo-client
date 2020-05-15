import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage } from "@inlet/react-pixi";
import MyGameSight from "../../../domain/MyGameSight";
import { fieldCenter, stageSize } from "../pixiStyles";
import { PlayingField } from "./PlayingField";
import { Discards } from "./Discards";
import { CoPlayer } from "../CoPlayer";
import { Me } from "./Me";
import Card from "../../../domain/Card";
import { SeatName } from "../../../domain/SeatName";

type PlayingStageProp = {
  gameSight: MyGameSight;
  findName: (seatName: SeatName) => string;
  discards: Card[];
};
export const PlayingStage: React.FC<PlayingStageProp> = (
  props: PlayingStageProp
) => {
  const notMyHandsScale = 0.5;

  const myGameSight = props.gameSight;
  const findName = props.findName;
  return (
    <Stage height={stageSize.y} width={stageSize.x}>
      <CoPlayer
        gameSight={myGameSight}
        findName={(seatName): string => findName(seatName)}
      />
      <PlayingField
        sight={myGameSight}
        x={fieldCenter.x(notMyHandsScale)}
        y={fieldCenter.y()}
      />
      <Discards discards={props.discards} />
      <Me
        hands={myGameSight.myHands()}
        name={findName(myGameSight.mySeat.seatName)}
        isMyTurn={myGameSight.isMyTurn()}
        onDiscard={(card): void => {
          console.log(card);
        }}
      />
    </Stage>
  );
};

PlayingStage.propTypes = {
  gameSight: PropTypes.instanceOf(MyGameSight).isRequired,
  findName: PropTypes.func.isRequired,
  discards: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
};
