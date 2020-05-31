import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage } from "@inlet/react-pixi";
import MyGameSight from "../../../domain/MyGameSight";
import { fieldCenter, stageSize, myPos } from "../pixiStyles";
import { PlayingField } from "./PlayingField";
import { DeclaredInfo } from "./DeclaredInfo";
import { CoPlayer } from "../CoPlayer";
import Card from "../../../domain/Card";
import { SeatName } from "../../../domain/SeatName";
import { PlayerCards } from "../PlayerCards";
import { Declaration } from "../../../domain/Declaration";

const initialPlayCard = new Card("spade", 0);
const notMyHandsScale = 0.6;
type PlayingStageProp = {
  gameSight: MyGameSight;
  findName: (seatName: SeatName) => string;
  declaration: Declaration;
  onPlayCard: (card: Card, seatName: SeatName) => void;
  isShowCards: boolean;
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
        isShowCards={props.isShowCards}
      />
      <PlayingField
        sight={myGameSight}
        x={fieldCenter.x(notMyHandsScale)}
        y={fieldCenter.y()}
      />
      <DeclaredInfo declaration={props.declaration} />
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
          // FIXME: 手札を切ったあと高速でクリックされるとまだ自分のターン判定になり追加で手札を切れてしまう
          // TODO: リクエスト中のステータスをもって制御する
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
  declaration: PropTypes.instanceOf(Declaration).isRequired,
  findName: PropTypes.func.isRequired,
  onPlayCard: PropTypes.func.isRequired,
  isShowCards: PropTypes.bool,
};
