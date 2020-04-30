import * as React from "react";
import * as PropTypes from "prop-types";
import { CardContent, Card, Button, Divider } from "@material-ui/core";
import GameTable from "../../domain/GameTable";
import { TableSeat } from "./TableSeat";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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

const sitDown = (): void => {
  console.log("sitDown");
};

type SeatName =
  | "seatFirst"
  | "seatSecond"
  | "seatThird"
  | "seatFourth"
  | "seatFifth";

class Seats {
  seatFirst? = "";
  seatSecond? = "";
  seatThird? = "";
  seatFourth? = "";
  seatFifth? = "";
}

export const TableSeats: React.FC<{ table: GameTable }> = ({ table }) => {
  const classes = useStyles();
  const [inputNames, setInputNames] = React.useState<Seats>(new Seats());
  const onInput = (seat: SeatName) => (inputName: string): void => {
    setInputNames({ [seat]: inputName });
  };
  const canSitDown = (gameTable: GameTable, inputNames: Seats): boolean => {
    if (Object.values(inputNames).filter((iName) => !!iName).length === 1) {
      return true;
    }
    return !!(
      gameTable.seatFirst &&
      gameTable.seatSecond &&
      gameTable.seatThird &&
      gameTable.seatFourth &&
      gameTable.seatFifth
    );
  };
  const canInput = (seat: SeatName): boolean => {
    if (table[seat]) {
      return false;
    }
    if (inputNames[seat]) {
      return true;
    }
    return Object.values(inputNames).every((seat) => !seat);
  };

  return (
    <Card className={classes.tableSeats}>
      <CardContent>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={table.seatFirst}
              disabled={!canInput("seatFirst")}
              onInput={onInput("seatFirst")}
            />
            <TableSeat
              name={table.seatSecond}
              disabled={!canInput("seatSecond")}
              onInput={onInput("seatSecond")}
            />
          </div>
        </div>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={table.seatThird}
              disabled={!canInput("seatThird")}
              onInput={onInput("seatThird")}
            />
            <TableSeat
              name={table.seatFourth}
              disabled={!canInput("seatFourth")}
              onInput={onInput("seatFourth")}
            />
          </div>
        </div>
        <div>
          <div className={classes.seatRow}>
            <TableSeat
              name={table.seatFifth}
              disabled={!canInput("seatFifth")}
              onInput={onInput("seatFifth")}
            />
          </div>
        </div>
        <Divider light />
        <div className={classes.sitDownButton}>
          <Button
            variant="contained"
            color="primary"
            disabled={!canSitDown(table, inputNames)}
            onClick={sitDown}
          >
            座る
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
TableSeats.propTypes = {
  table: PropTypes.instanceOf(GameTable),
};
