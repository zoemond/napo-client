import * as React from "react";
import * as PropTypes from "prop-types";

import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { Seats } from "../../ducks/seats/state";
import { SeatsContext, SeatsDispatchContext } from "../../ducks/seats/Context";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";
import MyGameSight from "../../domain/MyGameSight";
import GameTable from "../../domain/GameTable";
import { SeatName } from "../../domain/SeatName";
import { PlayingStage } from "./playing/PlayingStage";
import { DeclarationStage } from "./declaring/DeclarationStage";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";
import { DeclarationState } from "../../ducks/declaration/state";
import {
  DeclarationContext,
  DeclarationDispatchContext,
} from "../../ducks/declaration/Context";
import { TurnContext, TurnDispatchContext } from "../../ducks/turn/Context";
import { TurnState } from "../../ducks/turn/state";

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
  const myGameState = React.useContext<MyGameState>(MyGameContext);
  const gameTableId = myGameState.gameTableId;
  const classes = useStyles();

  const { seats } = React.useContext<Seats>(SeatsContext);
  const { declaration } = React.useContext<DeclarationState>(
    DeclarationContext
  );
  const { turn } = React.useContext<TurnState>(TurnContext);

  const seatsActions = React.useContext(SeatsDispatchContext);
  const declarationActions = React.useContext(DeclarationDispatchContext);
  const turnActions = React.useContext(TurnDispatchContext);

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

  const findName = (seatName: SeatName): string => gameTable.findName(seatName);
  const myGameSight = new MyGameSight(myGameState.mySeatName, seats);

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
