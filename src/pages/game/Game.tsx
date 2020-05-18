import * as React from "react";
import * as PropTypes from "prop-types";

import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { SeatsContext, SeatsDispatchContext } from "../../ducks/seats/Context";
import { MyGameContext } from "../../ducks/my_game/Context";
import MyGameSight from "../../domain/MyGameSight";
import GameTable from "../../domain/GameTable";
import { SeatName, orderedSeatNames } from "../../domain/SeatName";
import { PlayingStage } from "./playing/PlayingStage";
import { DeclarationStage } from "./declaring/DeclarationStage";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";
import {
  DeclarationContext,
  DeclarationDispatchContext,
} from "../../ducks/declaration/Context";
import { RoundContext, RoundDispatchContext } from "../../ducks/round/Context";
import Card from "../../domain/Card";

import * as storage from "../../localStorage/localStorage";
import { MyGameState } from "../../ducks/my_game/state";

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
  const { round } = React.useContext(RoundContext);

  const seatsActions = React.useContext(SeatsDispatchContext);
  const declarationActions = React.useContext(DeclarationDispatchContext);
  const roundActions = React.useContext(RoundDispatchContext);

  const gameTableId = myGameState.gameTableId;

  React.useEffect(() => {
    seatsActions.readSeats(gameTableId);
    declarationActions.readDeclaration(gameTableId);
    roundActions.readRound(gameTableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!seats) {
    return <Container>empty</Container>;
  }

  const gameTable = props.gameTable;
  const myGameSight = new MyGameSight(myGameState.mySeatName, seats);

  const findName = (seatName: SeatName): string => gameTable.findName(seatName);
  const onPlayCard = (card: Card, seatName: SeatName): void => {
    seatsActions.playCard(gameTableId, card, seatName);
  };

  return (
    <Container className={classes.game}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={(): void => roundActions.startRound(gameTableId)}
        >
          カードを配る
        </Button>
        <LeaveButton
          gameTableIdToLeave={gameTableId}
          myGameState={myGameState}
        />
        {/* TODO: Debug中のみ表示 */}
        {orderedSeatNames.map((seatName, i) => {
          return (
            <Button
              key={i}
              onClick={(): void => {
                storage.setMyGame(
                  new MyGameState({ gameTableId, mySeatName: seatName })
                );
                location.reload();
              }}
            >
              {i + 1}
            </Button>
          );
        })}
      </div>
      {declaration.isDeclared() ? (
        <PlayingStage
          gameSight={myGameSight}
          findName={findName}
          discards={declaration.discards}
          onPlayCard={onPlayCard}
        />
      ) : (
        <DeclarationStage
          gameSight={myGameSight}
          findName={findName}
          openCards={round.openCards}
          isOpened={round.isOpened}
          onOpen={(): void => roundActions.open(gameTableId)}
          declare={declarationActions.declare}
        />
      )}
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
