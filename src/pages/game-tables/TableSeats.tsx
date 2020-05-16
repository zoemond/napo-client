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

import { MyGameState } from "../../ducks/my_game/state";
import { SeatName } from "../../domain/SeatName";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";

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
    tableActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: theme.spacing(1),
    },
    actionButton: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

const canLeave = (myGame: MyGameState, gameTable: GameTable): boolean => {
  if (myGame.gameTableId !== gameTable.id) {
    return false;
  }
  return myGame.isSitDown();
};

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
  if (gameTable.findName(seatName)) {
    return false;
  }
  if (!inputPlayer.seatName) {
    return true;
  }
  if (!inputPlayer.inputName) {
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
  const onChange = (seatName: SeatName) => (inputName: string): void => {
    setInputPlayer({ seatName, inputName });
  };

  const myGameState = React.useContext(MyGameContext);
  const dispatcher = React.useContext(MyGameDispatchContext);

  const sitDown = (gameTableId: number): void => {
    const seatName = inputPlayer.seatName;
    const playerName = inputPlayer.inputName;
    dispatcher.sitDown(gameTableId, seatName, playerName);
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
              onChange={onChange("first_seat")}
            />
            <TableSeat
              name={gameTable.secondPlayer().name}
              disabled={
                !canInput(myGameState, "second_seat", gameTable, inputPlayer)
              }
              onChange={onChange("second_seat")}
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
              onChange={onChange("third_seat")}
            />
            <TableSeat
              name={gameTable.fourthPlayer().name}
              disabled={
                !canInput(myGameState, "fourth_seat", gameTable, inputPlayer)
              }
              onChange={onChange("fourth_seat")}
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
              onChange={onChange("fifth_seat")}
            />
          </div>
        </div>
        <Divider light />
        <div className={classes.tableActions}>
          <Typography className={classes.actionButton} variant="subtitle2">
            卓 {gameTable.id}
          </Typography>
          <div>
            <LeaveButton
              gameTableIdToLeave={gameTable.id}
              myGameState={myGameState}
              onLeave={(seatName): void => onChange(seatName)("")}
            />

            <Button
              className={classes.actionButton}
              variant="contained"
              color="primary"
              disabled={!canSitDown(myGameState, gameTable, inputPlayer)}
              onClick={(): void => sitDown(gameTable.id)}
            >
              座る
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
TableSeats.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable),
};
