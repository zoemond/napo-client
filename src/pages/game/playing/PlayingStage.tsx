import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage } from "@inlet/react-pixi";
import MyGameSight from "../../../domain/MyGameSight";
import { fieldCenter, stageSize, myPos } from "../pixiStyles";
import { PlayingField } from "./PlayingField";
import { Discards } from "./Discards";
import { CoPlayer } from "../CoPlayer";
import Card from "../../../domain/Card";
import { SeatName } from "../../../domain/SeatName";
import { PlayerCards } from "../PlayerCards";

const initialPlayCard = new Card("spade", 0);
const notMyHandsScale = 0.6;
type PlayingStageProp = {
  gameSight: MyGameSight;
  findName: (seatName: SeatName) => string;
  discards: Card[];
  onPlayCard: (card: Card, seatName: SeatName) => void;
};
export const PlayingStage: React.FC<PlayingStageProp> = (
  props: PlayingStageProp
) => {
  const [playCard, setPlayCard] = React.useState(initialPlayCard);
  const myGameSight = props.gameSight;
  const findName = props.findName;
  const mySeatName = myGameSight.mySeat.seatName;
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
      <PlayerCards
        faceCards={myGameSight.mySeat.faceCards}
        hands={myGameSight.myHands()}
        x={myPos().x}
        y={myPos().y}
        selectedCards={[playCard]}
        name={findName(mySeatName)}
        pointerdown={(card: Card): void => {
          console.log(card);
          if (!playCard.equals(card)) {
            setPlayCard(card);
            return;
          }
          if (myGameSight.isMyTurn()) {
            props.onPlayCard(card, mySeatName);
          }
        }}
      />
    </Stage>
  );
};

PlayingStage.propTypes = {
  gameSight: PropTypes.instanceOf(MyGameSight).isRequired,
  discards: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
  findName: PropTypes.func.isRequired,
  onPlayCard: PropTypes.func.isRequired,
};
