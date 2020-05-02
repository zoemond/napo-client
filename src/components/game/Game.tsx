import * as React from "react";
import { Stage, Sprite } from "@inlet/react-pixi";
import { Container } from "@material-ui/core";
import { GameCardsState } from "../../ducks/game_cards/state";
import { GameCardsContext } from "../../ducks/game_cards/Context";
import { socket } from "../../ducks/socket/socket";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";

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
  const { gameTableId, seat } = React.useContext<MyGameState>(MyGameContext);
  const { gameCards } = React.useContext<GameCardsState>(GameCardsContext);
  React.useEffect(() => {
    socket.emit("read_cards", gameTableId);
  }, []);

  if (!gameCards) {
    return <Container>empty</Container>;
  }
  const open1 = gameCards.open[0].toStr();
  const open2 = gameCards.open[1].toStr();
  return (
    <Container>
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
        {gameCards[seat].map((card, i) => {
          const cardName = card.toStr();
          return (
            <Sprite
              key={cardName}
              image={`src/assets/cards/${cardName}.png`}
              x={120 + i * space}
              y={handsHight}
              interactive={true}
              pointerup={(e: PIXI.interaction.InteractionEvent): void => {
                console.log(e);
              }}
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
