import * as React from "react";
import * as PropTypes from "prop-types";

import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { SeatsContext, SeatsDispatchContext } from "../../ducks/seats/Context";
import { MyGameContext } from "../../ducks/my_game/Context";
import MyGameSight from "../../domain/MyGameSight";
import GameTable from "../../domain/GameTable";
import { SeatName } from "../../domain/SeatName";
import { PlayingStage } from "./playing/PlayingStage";
import { DeclarationStage } from "./declaring/DeclarationStage";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";
import {
  DeclarationContext,
  DeclarationDispatchContext,
} from "../../ducks/declaration/Context";
import { TurnContext, TurnDispatchContext } from "../../ducks/turn/Context";
import { socket } from "../../ducks/socket/socket";
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
  const classes = useStyles();

  const myGameState = React.useContext(MyGameContext);
  const { seats } = React.useContext(SeatsContext);
  const { declaration } = React.useContext(DeclarationContext);
  const { turn } = React.useContext(TurnContext);

  const seatsActions = React.useContext(SeatsDispatchContext);
  const declarationActions = React.useContext(DeclarationDispatchContext);
  const turnActions = React.useContext(TurnDispatchContext);

  const gameTableId = myGameState.gameTableId;

  React.useEffect(() => {
    seatsActions.readSeats(gameTableId);
    declarationActions.readDeclaration(gameTableId);
    turnActions.readTurn(gameTableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!seats) {
    return <Container>empty</Container>;
  }

  const gameTable = props.gameTable;
  const myGameSight = new MyGameSight(myGameState.mySeatName, seats);

  const findName = (seatName: SeatName): string => gameTable.findName(seatName);
  const onPlayCard = (card: Card, seatName: SeatName): void => {
    socket.emit("play_card", { gameTableId, seatName, card });
  };

  return (
    <Container className={classes.game}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={(): void => {
            turnActions.startTurn(gameTableId);
          }}
        >
          カードを配る
        </Button>
        <LeaveButton
          gameTableIdToLeave={gameTableId}
          myGameState={myGameState}
        />
      </div>
      {declaration.isDeclared() ? (
        <PlayingStage
          myGameState={myGameState}
          gameSight={myGameSight}
          findName={findName}
          discards={declaration.discards}
          onPlayCard={onPlayCard}
        />
      ) : (
        <DeclarationStage
          myGameState={myGameState}
          gameSight={myGameSight}
          findName={findName}
          openCards={turn.openCards}
          isOpened={turn.isOpened}
          declare={declarationActions.declare}
        />
      )}
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
