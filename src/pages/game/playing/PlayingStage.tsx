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
import { socket } from "../../../ducks/socket/socket";
import { MyGameState } from "../../../ducks/my_game/state";
import { MyGameContext } from "../../../ducks/my_game/Context";

type PlayingStageProp = {
  gameSight: MyGameSight;
  findName: (seatName: SeatName) => string;
  discards: Card[];
};
export const PlayingStage: React.FC<PlayingStageProp> = (
  props: PlayingStageProp
) => {
  const { gameTableId, mySeatName } = React.useContext<MyGameState>(
    MyGameContext
  );
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
        name={findName(mySeatName)}
        isMyTurn={myGameSight.isMyTurn()}
        onDiscard={(card): void => {
          socket.emit("play_card", { gameTableId, seatName: mySeatName, card });
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
