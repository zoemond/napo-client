import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage } from "@inlet/react-pixi";
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
} from "./pixiStyles";
import { PlayerCards } from "./PlayerCards";
import { PlayCards } from "./PlayCards";
import Card from "../../domain/Card";

const useStyles = makeStyles(() =>
  createStyles({
    game: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

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

  if (!seats) {
    return <Container>empty</Container>;
  }

  const gameTable = props.gameTable;
  const startTurn = (): void => {
    socket.emit("start_turn", { gameTableId });
  };

  const myGameSight = new MyGameSight(mySeatName, seats);
  const notMyHandsScale = 0.5;
  return (
    <Container className={classes.game}>
      <div>
        <Button variant="contained" color="primary" onClick={startTurn}>
          カードを配る
        </Button>
      </div>
      <Stage height={stageSize.y} width={stageSize.x}>
        <PlayerCards
          hands={myGameSight.myCards()}
          x={myPos().x}
          y={myPos().y}
          name={gameTable.findName(myGameSight.mySeat.seatName)}
          pointerdown={(card: Card): void => {
            console.log(card);
          }}
        />
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
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
