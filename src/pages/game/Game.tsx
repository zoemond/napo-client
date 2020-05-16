import * as React from "react";
import * as PropTypes from "prop-types";

import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { Seats } from "../../ducks/seats/state";
import { SeatsContext, SeatsDispatchContext } from "../../ducks/seats/Context";
import { socket } from "../../ducks/socket/socket";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";
import MyGameSight from "../../domain/MyGameSight";
import GameTable from "../../domain/GameTable";
import Card from "../../domain/Card";
import { SeatName } from "../../domain/SeatName";
import { Turn } from "../../domain/Turn";
import { TurnResponse, TurnSuccessResponse } from "../../response/TurnResponse";
import { PlayingStage } from "./playing/PlayingStage";
import { DeclarationStage } from "./declaring/DeclarationStage";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";
import { DeclarationState } from "../../ducks/declaration/state";
import {
  DeclarationContext,
  DeclarationDispatchContext,
} from "../../ducks/declaration/Context";

const useStyles = makeStyles(() =>
  createStyles({
    game: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

const initialTurn = new Turn(0, [new Card("spade", 0), new Card("spade", 0)]);
type GamePageProp = {
  gameTable: GameTable;
};
export const GamePage: React.FC<GamePageProp> = (props: GamePageProp) => {
  const myGameState = React.useContext<MyGameState>(MyGameContext);
  const gameTableId = myGameState.gameTableId;
  const classes = useStyles();

  const { seats } = React.useContext<Seats>(SeatsContext);
  const seatsActions = React.useContext(SeatsDispatchContext);
  const { declaration } = React.useContext<DeclarationState>(
    DeclarationContext
  );
  const declarationActions = React.useContext(DeclarationDispatchContext);

  React.useEffect(() => {
    seatsActions.readSeats(gameTableId);
    declarationActions.readDeclaration(gameTableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [turn, setTurn] = React.useState<Turn>(initialTurn);
  React.useEffect(() => {
    socket.on("turn", (response: TurnResponse) => {
      console.log("turn, dispatch", response);
      const turnObj = (response as TurnSuccessResponse).turn;
      if (turnObj && turnObj.openCards) {
        setTurn(Turn.fromObj(turnObj));
      }
    });
    socket.emit("read_turn", { gameTableId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!seats) {
    return <Container>empty</Container>;
  }

  const gameTable = props.gameTable;
  const startTurn = (): void => {
    socket.emit("start_turn", { gameTableId });
  };

  const findName = (seatName: SeatName): string => gameTable.findName(seatName);
  const myGameSight = new MyGameSight(myGameState.mySeatName, seats);

  return (
    <Container className={classes.game}>
      <div>
        <Button variant="contained" color="primary" onClick={startTurn}>
          カードを配る
        </Button>
        <LeaveButton
          gameTableIdToLeave={gameTable.id}
          myGameState={myGameState}
        />
      </div>
      {declaration.isDeclared() ? (
        <PlayingStage
          gameSight={myGameSight}
          findName={findName}
          discards={declaration.discards}
        />
      ) : (
        <DeclarationStage
          gameSight={myGameSight}
          findName={findName}
          openCards={turn.openCards}
          isOpened={turn.isOpened}
        />
      )}
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
