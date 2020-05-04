import * as React from "react";
import { Stage, Sprite, Text } from "@inlet/react-pixi";
import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { GameState } from "../../ducks/game_cards/state";
import { GameCardsContext } from "../../ducks/game_cards/Context";
import { socket } from "../../ducks/socket/socket";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";
import MyGameSight from "../../domain/MyGameSight";

const useStyles = makeStyles(() =>
  createStyles({
    game: {
      display: "flex",
      flexDirection: "column",
    },
  })
);
const stageWidth = 800;
const stageHight = 600;
const center = { x: stageWidth / 2, y: stageHight / 2 };

const cardHight = 212;
const cardWidth = 150;

const handsHight = stageHight - cardHight;
const cardCenter = {
  x: center.x - cardWidth / 2,
  y: center.y - cardHight,
};

const space = 40;

export const GamePage: React.FC = () => {
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
      <Stage height={stageHight}>
        <Sprite
          image={`src/assets/cards/${open1}.png`}
          x={cardCenter.x - space}
          y={cardCenter.y}
        />
        <Sprite
          image={`src/assets/cards/${open2}.png`}
          x={cardCenter.x + space}
          y={cardCenter.y}
        />
        {myGameSight.myCards().map((card, i) => {
          const cardName = card.toStr();
          return (
            <Sprite
              key={cardName}
              image={`src/assets/cards/${cardName}.png`}
              x={120 + i * space}
              y={handsHight}
              interactive={true}
              pointerdown={(e: PIXI.interaction.InteractionEvent): void => {
                console.log(e);
              }}
            />
          );
        })}
      </Stage>
    </Container>
  );
};
