import * as React from "react";
import * as PropTypes from "prop-types";
import { CardContent, Card, Divider, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import GameTable from "../../domain/GameTable";
import { SeatName } from "../../domain/SeatName";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";
import { SitDownButton } from "../../ducks/my_game/SitDownButton";
import { TableSeat } from "./TableSeat";

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
            <SitDownButton
              gameTableToSitDown={gameTable}
              myGameState={myGameState}
              seatName={inputPlayer.seatName}
              playerName={inputPlayer.inputName}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
TableSeats.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable),
};
