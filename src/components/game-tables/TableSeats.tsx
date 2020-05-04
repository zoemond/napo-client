import * as React from "react";
import * as PropTypes from "prop-types";
import {
  CardContent,
  Card,
  Button,
  Divider,
  Typography,
} from "@material-ui/core";
import GameTable from "../../domain/GameTable";
import { TableSeat } from "./TableSeat";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { socket } from "../../ducks/socket/socket";
import {
  MyGameDispatchContext,
  MyGameContext,
} from "../../ducks/my_game/Context";

import { SIT_DOWN } from "../../ducks/my_game/types";
import { MyGameState } from "../../ducks/my_game/state";
import { SeatName } from "../../domain/SeatName";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableSeats: {
      width: "max-content",
      margin: theme.spacing(1),
    },
    seatRow: {
      display: "flex",
      justifyContent: "center",
    },
    sitDownButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: theme.spacing(1),
    },
  })
);

const canSitDown = (
  myGame: MyGameState,
  gameTable: GameTable,
  inputPlayer: InputPlayer
): boolean => {
  if (myGame.gameTableId && myGame.mySeatName) {
    return false;
  }
  if (gameTable.isAllSitDown()) {
    return false;
  }
  return !!inputPlayer.inputName;
};

const canInput = (
  gameState: MyGameState,
  seatName: SeatName,
  gameTable: GameTable,
  inputPlayer: InputPlayer
): boolean => {
  if (gameState.isSitDown()) {
    return false;
  }
  if (gameTable.findPlayer(seatName).name) {
    return false;
  }
  if (!inputPlayer.seatName) {
    return true;
  }

  return inputPlayer.seatName === seatName;
};

type InputPlayer = {
  seatName?: SeatName;
  inputName?: string;
};
export const TableSeats: React.FC<{ gameTable: GameTable }> = ({
  gameTable,
}) => {
  const classes = useStyles();

  const [inputPlayer, setInputPlayer] = React.useState<InputPlayer>({});
  const onInput = (seatName: SeatName) => (inputName: string): void => {
    setInputPlayer({ seatName, inputName });
  };

  const myGameState = React.useContext(MyGameContext);
  const dispatch = React.useContext(MyGameDispatchContext);

  const sitDown = (gameTableId: number): void => {
    const seatName = inputPlayer.seatName;
    socket.emit("sit_down", {
      gameTableId,
      seatName,
      playerName: inputPlayer.inputName,
    });
    dispatch({
      type: SIT_DOWN,
      payload: new MyGameState({
        gameTableId,
        mySeatName: seatName as SeatName,
      }),
    });
  };

  return (
    <Card className={classes.tableSeats}>
      <CardContent>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={gameTable.firstPlayer().name}
              disabled={
                !canInput(myGameState, "first_seat", gameTable, inputPlayer)
              }
              onInput={onInput("first_seat")}
            />
            <TableSeat
              name={gameTable.secondPlayer().name}
              disabled={
                !canInput(myGameState, "second_seat", gameTable, inputPlayer)
              }
              onInput={onInput("second_seat")}
            />
          </div>
        </div>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={gameTable.thirdPlayer().name}
              disabled={
                !canInput(myGameState, "third_seat", gameTable, inputPlayer)
              }
              onInput={onInput("third_seat")}
            />
            <TableSeat
              name={gameTable.fourthPlayer().name}
              disabled={
                !canInput(myGameState, "fourth_seat", gameTable, inputPlayer)
              }
              onInput={onInput("fourth_seat")}
            />
          </div>
        </div>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={gameTable.fifthPlayer().name}
              disabled={
                !canInput(myGameState, "fifth_seat", gameTable, inputPlayer)
              }
              onInput={onInput("fifth_seat")}
            />
          </div>
        </div>
        <Divider light />
        <div className={classes.sitDownButton}>
          <Typography variant="subtitle2">卓 {gameTable.id}</Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={!canSitDown(myGameState, gameTable, inputPlayer)}
            onClick={(): void => sitDown(gameTable.id)}
          >
            座る
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
TableSeats.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable),
};
