import * as React from "react";
import * as PropTypes from "prop-types";

import { Stage, Sprite, Text } from "@inlet/react-pixi";
import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { GameState } from "../../ducks/game_cards/state";
import { GameCardsContext } from "../../ducks/game_cards/Context";
import { socket } from "../../ducks/socket/socket";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";
import MyGameSight from "../../domain/MyGameSight";
import GameTable from "../../domain/GameTable";
import { PlayCardComponent } from "./PlayCardComponent";
import {
  openPos,
  leftPos,
  myPos,
  stageSize,
  nameStyle,
  rightPos,
  frontLeftPos,
  frontRightPos,
} from "./pixiStyles";
import { PlayCardSprite } from "./PlayCardSprite";

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
  }, []);

  if (!seats) {
    return <Container>empty</Container>;
  }

  const gameTable = props.gameTable;
  const startTurn = (): void => {
    socket.emit("start_turn", { gameTableId });
  };
  const open1 = "back";
  const open2 = "back";

  const myGameSight = new MyGameSight(mySeatName, seats);
  return (
    <Container className={classes.game}>
      <div>
        <Button variant="contained" color="primary" onClick={startTurn}>
          カードを配る
        </Button>
      </div>
      <Stage height={stageSize.y} width={stageSize.x}>
        <Sprite
          image={`src/assets/cards/${open1}.png`}
          x={openPos.open1.x}
          y={openPos.open1.y}
        />
        <Sprite
          image={`src/assets/cards/${open2}.png`}
          x={openPos.open2.x}
          y={openPos.open2.y}
        />
        {myGameSight.myCards().map((card, i) => {
          const cardName = card.toStr();
          return (
            <Sprite
              key={cardName}
              image={`src/assets/cards/${cardName}.png`}
              x={i * 40}
              y={myPos.handY}
              interactive={true}
              pointerdown={(e: PIXI.interaction.InteractionEvent): void => {
                console.log(e);
              }}
            />
          );
        })}
        <PlayCardSprite
          playCard={myGameSight.mySeat.playCard}
          x={myPos.playCardX}
          y={myPos.playCardY}
        />
        <Text
          text={gameTable.findName(myGameSight.mySeat.seatName)}
          x={myPos.nameX}
          y={myPos.nameY}
          // typescriptのエラーが出る
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          style={nameStyle}
        />
        <PlayCardComponent
          seat={myGameSight.leftSeat}
          getName={(s): string => gameTable.findName(s)}
          baseX={leftPos.x}
          baseY={leftPos.y}
        />
        <PlayCardComponent
          seat={myGameSight.frontLeftSeat}
          getName={(s): string => gameTable.findName(s)}
          baseX={frontLeftPos.x}
          baseY={frontLeftPos.y}
        />
        <PlayCardComponent
          seat={myGameSight.rightSeat}
          getName={(s): string => gameTable.findName(s)}
          baseX={rightPos.x}
          baseY={rightPos.y}
        />
        <PlayCardComponent
          seat={myGameSight.frontRightSeat}
          getName={(s): string => gameTable.findName(s)}
          baseX={frontRightPos.x}
          baseY={frontRightPos.y}
        />
      </Stage>
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
