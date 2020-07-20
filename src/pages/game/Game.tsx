import * as React from "react";
import * as PropTypes from "prop-types";

import {
  Container,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
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
import { RoundContext, RoundDispatchContext } from "../../ducks/round/Context";
import Card from "../../domain/Card";

import { DebugSwitchSeat } from "./DebugSwitchSeat";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    game: {
      display: "flex",
      flexDirection: "column",
    },
    gameActions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    actionButton: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
    roundActions.readRound(gameTableId);
    declarationActions.readDeclaration(gameTableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myGameSight = new MyGameSight(myGameState.mySeatName, seats || []);
  React.useEffect(() => {
    if (!seats) return;
    if (seats.every((seat) => seat.playCard)) {
      setTimeout(() => {
        seatsActions.readSeats(gameTableId);
      }, 1000);
    }
  }, [gameTableId, seats, seatsActions]);

  if (!seats) {
    return <Container>empty</Container>;
  }

  const isShowCards = round.isEnds();
  const gameTable = props.gameTable;

  const findName = (seatName: SeatName): string => gameTable.findName(seatName);
  const onPlayCard = (card: Card, seatName: SeatName): void => {
    seatsActions.playCard(gameTableId, card, seatName);
  };
  const onReHandOut = (): void => {
    roundActions.startRound(gameTableId);
  };
  const onNewRound = (): void => {
    roundActions.calcScoreAndNewRound(gameTableId);
  };
  return (
    <Container className={classes.game}>
      <div className={classes.gameActions}>
        <Button variant="contained" color="primary" onClick={onNewRound}>
          次のラウンド
        </Button>
        <Button
          className={classes.actionButton}
          variant="contained"
          onClick={(): void => roundActions.completeRound(gameTableId)}
        >
          全員の手札を開く
        </Button>
        <Button
          className={classes.actionButton}
          variant="contained"
          onClick={onReHandOut}
        >
          カードを配り直す(点数計算しない)
        </Button>
        <LeaveButton
          gameTableIdToLeave={gameTableId}
          myGameState={myGameState}
        />
        <DebugSwitchSeat gameTableId={gameTableId} />
      </div>
      {declaration.isDeclared() ? (
        <PlayingStage
          gameSight={myGameSight}
          findName={findName}
          declaration={declaration}
          onPlayCard={onPlayCard}
          isShowCards={isShowCards}
        />
      ) : (
        <DeclarationStage
          gameSight={myGameSight}
          findName={findName}
          openCards={round.openCards}
          isOpened={round.isOpened}
          onOpen={(): void => roundActions.open(gameTableId)}
          declare={declarationActions.declare}
          isShowCards={isShowCards}
        />
      )}
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
