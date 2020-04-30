import * as React from "react";
import * as PropTypes from "prop-types";
import { CardContent, Card, Button, Divider } from "@material-ui/core";
import GameTable from "../../domain/GameTable";
import { TableSeat } from "./TableSeat";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { socket } from "../../ducks/socket/socket";
import {
  MyGameDispatchContext,
  MyGameContext,
} from "../../ducks/my_game/Context";

import { SIT_DOWN } from "../../ducks/my_game/types";
import { Seats, SeatName } from "./Seats";
import { MyGameState } from "../../ducks/my_game/state";

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
      justifyContent: "flex-end",
      marginTop: theme.spacing(1),
    },
  })
);

const canSitDown = (
  myGame: MyGameState,
  gameTable: GameTable,
  inputNames: Seats
): boolean => {
  if (myGame.gameTableId && myGame.seat) {
    return false;
  }
  if (Object.values(inputNames).filter((iName) => !!iName).length === 1) {
    return true;
  }
  return !gameTable.isAllSitDown();
};

const canInput = (
  gameState: MyGameState,
  seat: SeatName,
  gameTable: GameTable,
  inputNames: Seats
): boolean => {
  if (gameState.isSitDown()) {
    return false;
  }
  if (gameTable[seat]) {
    return false;
  }
  if (inputNames[seat]) {
    return true;
  }
  return Object.values(inputNames).every((seat) => !seat);
};

export const TableSeats: React.FC<{ gameTable: GameTable }> = ({
  gameTable,
}) => {
  const classes = useStyles();

  const [inputNames, setInputNames] = React.useState<Seats>({});
  const onInput = (seat: SeatName) => (inputName: string): void => {
    setInputNames({ [seat]: inputName });
  };

  const myGameState = React.useContext(MyGameContext);
  const dispatch = React.useContext(MyGameDispatchContext);

  const sitDown = (gameTableId: number): void => {
    const [seat, playerName] = Object.entries(inputNames).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, playerName]) => !!playerName
    );
    socket.emit("sit_down", {
      gameTableId,
      seat,
      playerName,
    });
    dispatch({
      type: SIT_DOWN,
      payload: new MyGameState({ gameTableId, seat: seat as SeatName }),
    });
  };

  return (
    <Card className={classes.tableSeats}>
      <CardContent>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={gameTable.seatFirst}
              disabled={
                !canInput(myGameState, "seatFirst", gameTable, inputNames)
              }
              onInput={onInput("seatFirst")}
            />
            <TableSeat
              name={gameTable.seatSecond}
              disabled={
                !canInput(myGameState, "seatSecond", gameTable, inputNames)
              }
              onInput={onInput("seatSecond")}
            />
          </div>
        </div>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={gameTable.seatThird}
              disabled={
                !canInput(myGameState, "seatThird", gameTable, inputNames)
              }
              onInput={onInput("seatThird")}
            />
            <TableSeat
              name={gameTable.seatFourth}
              disabled={
                !canInput(myGameState, "seatFourth", gameTable, inputNames)
              }
              onInput={onInput("seatFourth")}
            />
          </div>
        </div>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={gameTable.seatFifth}
              disabled={
                !canInput(myGameState, "seatFifth", gameTable, inputNames)
              }
              onInput={onInput("seatFifth")}
            />
          </div>
        </div>
        <Divider light />
        <div className={classes.sitDownButton}>
          <Button
            variant="contained"
            color="primary"
            disabled={!canSitDown(myGameState, gameTable, inputNames)}
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
