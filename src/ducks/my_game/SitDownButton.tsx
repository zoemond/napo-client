import * as React from "react";
import * as PropTypes from "prop-types";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { MyGameState } from "./state";
import { SeatName, orderedSeatNames } from "../../domain/SeatName";
import { MyGameDispatchContext } from "./Context";
import GameTable from "../../domain/GameTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

const canSitDown = (
  myGame: MyGameState,
  gameTable: GameTable,
  playerName: string
): boolean => {
  if (myGame.gameTableId && myGame.mySeatName) {
    return false;
  }
  if (gameTable.isAllSitDown()) {
    return false;
  }
  return !!playerName;
};

type SitDownButtonProps = {
  gameTableToSitDown: GameTable;
  myGameState: MyGameState;
  seatName: SeatName;
  playerName: string;
};
export const SitDownButton: React.FC<SitDownButtonProps> = (props) => {
  const classes = useStyles();
  const gameTable = props.gameTableToSitDown;
  const myGameState = props.myGameState;
  const seatName = props.seatName;
  const playerName = props.playerName;
  const dispatcher = React.useContext(MyGameDispatchContext);

  const sitDown = (gameTableId: number): void => {
    dispatcher.sitDown(gameTableId, seatName, playerName);
  };

  return (
    <Button
      className={classes.actionButton}
      variant="contained"
      color="primary"
      disabled={!canSitDown(myGameState, gameTable, playerName)}
      onClick={(): void => sitDown(gameTable.id)}
    >
      座る
    </Button>
  );
};
SitDownButton.propTypes = {
  gameTableToSitDown: PropTypes.instanceOf(GameTable).isRequired,
  myGameState: PropTypes.instanceOf(MyGameState).isRequired,
  playerName: PropTypes.string,
  seatName: PropTypes.oneOf(orderedSeatNames),
};
