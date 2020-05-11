import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage, Text } from "@inlet/react-pixi";
import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { GameState } from "../../ducks/game_cards/state";
import { GameCardsContext } from "../../ducks/game_cards/Context";
import { socket } from "../../ducks/socket/socket";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";
import MyGameSight from "../../domain/MyGameSight";
import GameTable from "../../domain/GameTable";
import {
  rightPos,
  leftPos,
  fieldCenter,
  myPos,
  stageSize,
  frontLeftPos,
  frontRightPos,
  buttonTextStyle,
  getCardHeight,
} from "./pixiStyles";
import { PlayerCards } from "./PlayerCards";
import { PlayCards } from "./PlayCards";
import Card from "../../domain/Card";
import { DeclareDialog } from "./DeclareDialog";
import { Declaration } from "../../domain/Declaration";
import {
  DeclarationResponse,
  DeclarationSuccessResponse,
} from "../../response/DeclarationResponse";
import { OpenCards } from "./OpenCards";
import { TurnResponse, TurnSuccessResponse } from "../../response/TurnResponse";
import { Turn } from "../../domain/Turn";
import { Discards } from "./Discards";

const useStyles = makeStyles(() =>
  createStyles({
    game: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

const initialDeclaration = new Declaration(
  0,
  "no_trump",
  "fifth_seat",
  "fifth_seat"
);

const initialDiscards = [new Card("spade", 0), new Card("spade", 0)];
const initialTurn = new Turn(0, [new Card("spade", 0), new Card("spade", 0)]);
type GamePageProp = {
  gameTable: GameTable;
};
export const GamePage: React.FC<GamePageProp> = (props: GamePageProp) => {
  const { gameTableId, mySeatName } = React.useContext<MyGameState>(
    MyGameContext
  );
  const classes = useStyles();
  const { seats } = React.useContext<GameState>(GameCardsContext);
  React.useEffect(() => {
    socket.emit("read_seats", { gameTableId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [declaration, setDeclaration] = React.useState<Declaration>(
    initialDeclaration
  );
  const [turn, setTurn] = React.useState<Turn>(initialTurn);
  React.useEffect(() => {
    socket.on("declaration", (response: DeclarationResponse) => {
      console.log("declaration, dispatch", response);
      const declarationObj = (response as DeclarationSuccessResponse)
        .declaration;
      if (declarationObj) {
        setDeclaration(Declaration.fromObj(declarationObj));
      }
    });
    socket.emit("read_declaration", { gameTableId });
    socket.on("turn", (response: TurnResponse) => {
      console.log("turn, dispatch", response);
      const t = (response as TurnSuccessResponse).turn;
      if (t && t.openCards) {
        const open1 = t.openCards[0];
        const open2 = t.openCards[1];
        setTurn(
          new Turn(
            t.turnCount,
            [
              new Card(open1.suit, open1.number),
              new Card(open2.suit, open2.number),
            ],
            !!t.isOpened
          )
        );
      }
    });
    socket.emit("read_turn", { gameTableId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isDeclaring, setIsDeclaring] = React.useState(false);
  const [openDeclareDialog, setOpenDeclareDialog] = React.useState(false);
  const [discards, setDiscards] = React.useState(initialDiscards);

  if (!seats) {
    return <Container>empty</Container>;
  }

  const gameTable = props.gameTable;
  const startTurn = (): void => {
    socket.emit("start_turn", { gameTableId });
  };

  const myGameSight = new MyGameSight(mySeatName, seats);
  const notMyHandsScale = 0.5;

  const declare = (): void => {
    setIsDeclaring(true);
  };
  const onClose = ({ trump, faceCardNumber, aideCard }): void => {
    if (trump && faceCardNumber && aideCard) {
      socket.emit("declare_trump", {
        gameTableId,
        trump,
        faceCardNumber,
        aideCard,
        napoleon: mySeatName,
        discards,
      });
      setIsDeclaring(false);
    }
    setOpenDeclareDialog(false);
  };
  const isDeclared = !!declaration.faceCardNumber;
  const myHands = !isDeclaring
    ? myGameSight.myCards()
    : [...myGameSight.myCards(), ...turn.openCards];
  const existDiscard = isDeclaring && discards.every((c) => c.number);

  return (
    <Container className={classes.game}>
      <div>
        <Button variant="contained" color="primary" onClick={startTurn}>
          カードを配る
        </Button>
      </div>
      <Stage height={stageSize.y} width={stageSize.x}>
        {isDeclaring ? null : isDeclared ? (
          <Discards discards={declaration.discards} />
        ) : (
          <OpenCards
            opens={turn.openCards}
            onOpen={(): void => {
              socket.emit("open", { gameTableId });
            }}
            isOpened={turn.isOpened}
          />
        )}
        <PlayerCards
          hands={myHands}
          x={myPos().x}
          y={myPos().y}
          selectedCards={discards}
          name={gameTable.findName(myGameSight.mySeat.seatName)}
          pointerdown={(card: Card): void => {
            if (isDeclaring) {
              const foundCard = discards.find(
                (c) => c.toStr() === card.toStr()
              );
              if (!foundCard) {
                setDiscards([discards[1], card]);
              }
            } else if (isDeclared) {
              const foundCard = discards[0].toStr() === card.toStr();
              if (!foundCard) {
                setDiscards([card]);
              } else {
                socket.emit("play_card", {
                  gameTableId,
                  seat: mySeatName,
                  card: discards[0],
                });
                if (myGameSight.isEndOfLap()) {
                  setTimeout(() => {
                    socket.emit("end_lap", {
                      gameTableId,
                    });
                  }, 2000);
                }
              }
            }
            console.log(card);
          }}
        />
        {existDiscard && (
          <Text
            text="捨てる確定"
            buttonMode={true}
            interactive={true}
            pointerdown={(): void => {
              setOpenDeclareDialog(true);
            }}
            x={myPos().x}
            y={myPos().y + getCardHeight() / 2}
            // typescriptのエラーが出る
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            style={buttonTextStyle}
          />
        )}
        <PlayerCards
          hands={myGameSight.leftSeat.hands}
          x={leftPos(notMyHandsScale).x}
          y={leftPos(notMyHandsScale).y}
          isDown
          scale={notMyHandsScale}
          name={gameTable.findName(myGameSight.leftSeat.seatName)}
        />
        <PlayerCards
          hands={myGameSight.frontLeftSeat.hands}
          x={frontLeftPos(notMyHandsScale).x}
          y={frontLeftPos(notMyHandsScale).y}
          isDown
          scale={notMyHandsScale}
          name={gameTable.findName(myGameSight.frontLeftSeat.seatName)}
        />
        <PlayerCards
          hands={myGameSight.frontRightSeat.hands}
          x={frontRightPos(notMyHandsScale).x}
          y={frontRightPos(notMyHandsScale).y}
          isDown
          scale={notMyHandsScale}
          name={gameTable.findName(myGameSight.frontRightSeat.seatName)}
        />
        <PlayerCards
          hands={myGameSight.rightSeat.hands}
          x={rightPos(notMyHandsScale).x}
          y={rightPos(notMyHandsScale).y}
          isDown
          scale={notMyHandsScale}
          name={gameTable.findName(myGameSight.rightSeat.seatName)}
        />
        <PlayCards
          sight={myGameSight}
          x={fieldCenter.x(notMyHandsScale)}
          y={fieldCenter.y()}
        />
      </Stage>
      <div>
        <Button variant="contained" color="primary" onClick={declare}>
          立ちを確定する
        </Button>
        <DeclareDialog open={openDeclareDialog} onClose={onClose} />
      </div>
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
