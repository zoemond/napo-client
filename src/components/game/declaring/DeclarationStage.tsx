import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage } from "@inlet/react-pixi";

import { socket } from "../../../ducks/socket/socket";
import { MyGameContext } from "../../../ducks/my_game/Context";
import { MyGameState } from "../../../ducks/my_game/state";
import MyGameSight from "../../../domain/MyGameSight";
import { stageSize, myPos } from "../pixiStyles";
import Card from "../../../domain/Card";
import { DeclareDialog } from "./DeclareDialog";

import { CoPlayer } from "../CoPlayer";
import { SeatName } from "../../../domain/SeatName";
import { PlayerCards } from "../PlayerCards";
import { OpenCards } from "./OpenCards";
import { DeclarationStartButton } from "./DeclarationStartButton";
import { DiscardsButton } from "./DiscardsButton";

const initialDiscards = [new Card("spade", 0), new Card("spade", 0)];
type DeclarationStageProp = {
  gameSight: MyGameSight;
  findName: (seatName: SeatName) => string;
  openCards: [Card, Card];
  isOpened: boolean;
};

/**
 * 宣言時とゲーム時は(表示は似ているが)明確に違うことをしているのでコンポーネントを分けたい
 * DeclareDialogと同階層でダイアログ開閉のStateを扱い、見通しを良くしたい
 * DeclareDialogはPixiのコンポーネントではないため、Stageの外に置く必要がある
 * そのため、コンポーネントをStageごとに分けざるを得ない
 **/
export const DeclarationStage: React.FC<DeclarationStageProp> = (
  props: DeclarationStageProp
) => {
  const { gameTableId, mySeatName } = React.useContext<MyGameState>(
    MyGameContext
  );
  const [isDeclaringStarted, setIsDeclaringStarted] = React.useState(false);
  const [openDeclareDialog, setOpenDeclareDialog] = React.useState(false);
  const [discards, setDiscards] = React.useState(initialDiscards);

  const myGameSight = props.gameSight;

  const declareTrump = ({ trump, faceCardNumber, aideCard }): void => {
    if (trump && faceCardNumber && aideCard) {
      socket.emit("declare_trump", {
        gameTableId,
        trump,
        faceCardNumber,
        aideCard,
        napoleon: mySeatName,
        discards,
      });
      setIsDeclaringStarted(false);
    }
    setOpenDeclareDialog(false);
  };

  const findName = props.findName;
  const openCards = props.openCards;
  const [discard1, discard2] = discards;

  const hands = isDeclaringStarted
    ? [...myGameSight.myHands(), ...openCards]
    : myGameSight.myHands();
  const existDiscard = isDeclaringStarted && discards.every((c) => c.number);
  return (
    <React.Fragment>
      <Stage height={stageSize.y} width={stageSize.x}>
        <CoPlayer
          gameSight={myGameSight}
          findName={(seatName): string => findName(seatName)}
        />
        <PlayerCards
          hands={hands}
          x={myPos().x}
          y={myPos().y}
          selectedCards={discards}
          name={findName(myGameSight.mySeat.seatName)}
          pointerdown={(card: Card): void => {
            console.log(card);
            if (!isDeclaringStarted) {
              return;
            }
            if (discard2.equals(card)) {
              setDiscards([discard2, discard1]);
              return;
            }
            setDiscards([card, discard1]);
          }}
        />
        {!isDeclaringStarted && (
          <React.Fragment>
            <OpenCards
              opens={openCards}
              onOpen={(): void => socket.emit("open", { gameTableId })}
              isOpened={props.isOpened}
            />
            <DeclarationStartButton
              onClick={(): void => setIsDeclaringStarted(true)}
            />
          </React.Fragment>
        )}
        {existDiscard && (
          <DiscardsButton
            onDiscards={(): void => {
              setDiscards([discard1, discard2]);
              setOpenDeclareDialog(true);
              console.log("on discards", discard1, discard2);
            }}
          />
        )}
      </Stage>
      <DeclareDialog open={openDeclareDialog} onClose={declareTrump} />
    </React.Fragment>
  );
};

DeclarationStage.propTypes = {
  gameSight: PropTypes.instanceOf(MyGameSight).isRequired,
  findName: PropTypes.func.isRequired,
};
