import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage } from "@inlet/react-pixi";

import MyGameSight from "../../../domain/MyGameSight";
import Card from "../../../domain/Card";
import { Declaration } from "../../../domain/Declaration";
import { SeatName } from "../../../domain/SeatName";

import { stageSize, myPos } from "../pixiStyles";
import { CoPlayer } from "../CoPlayer";
import { PlayerCards } from "../PlayerCards";
import { OpenCards } from "./OpenCards";
import { DeclarationStartButton } from "./DeclarationStartButton";
import { DiscardsButton } from "./DiscardsButton";
import { DeclareDialog } from "./DeclareDialog";

const initialDiscard = new Card("spade", 0);
const initialDiscards = [initialDiscard, initialDiscard];
type DeclarationStageProp = {
  gameSight: MyGameSight;
  findName: (seatName: SeatName) => string;
  openCards: [Card, Card];
  isOpened: boolean;
  onOpen: () => void;
  declare: (declaration: Declaration) => void;
  isShowCards: boolean;
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
  const [isDeclaringStarted, setIsDeclaringStarted] = React.useState(false);
  const [openDeclareDialog, setOpenDeclareDialog] = React.useState(false);
  const [discards, setDiscards] = React.useState(initialDiscards);

  const myGameSight = props.gameSight;
  if (!myGameSight.mySeat) {
    return null;
  }
  const mySeatName = myGameSight.mySeat.seatName;

  const declareTrump = ({ trump, faceCardNumber, aideCard }): void => {
    if (trump && faceCardNumber && aideCard) {
      const [d1, d2] = discards;
      props.declare(
        new Declaration(faceCardNumber, trump, mySeatName, aideCard, [d1, d2])
      );

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

  const existOpen =
    !isDeclaringStarted && openCards && openCards.every((c) => c.number);
  const existDiscard = isDeclaringStarted && discards.every((c) => c.number);
  return (
    <React.Fragment>
      <Stage height={stageSize.y} width={stageSize.x}>
        <CoPlayer
          gameSight={myGameSight}
          findName={(seatName): string => findName(seatName)}
          isShowCards={props.isShowCards}
        />
        <PlayerCards
          hands={hands}
          x={myPos().x}
          y={myPos().y}
          selectedCards={discards}
          name={findName(mySeatName)}
          pointerdown={(card: Card): void => {
            console.log(card);
            if (!isDeclaringStarted) {
              return;
            }
            if (discard2.equals(card)) {
              setDiscards([discard1, initialDiscard]);
              return;
            }
            if (discard1.equals(card)) {
              setDiscards([discard2, initialDiscard]);
              return;
            }
            setDiscards([card, discard1]);
          }}
        />
        {existOpen && (
          <React.Fragment>
            <OpenCards
              opens={openCards}
              onOpen={props.onOpen}
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
  isShowCards: PropTypes.bool,
};
