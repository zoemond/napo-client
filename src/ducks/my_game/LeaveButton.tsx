import * as React from "react";
import * as PropTypes from "prop-types";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { MyGameState } from "./state";
import { SeatName } from "../../domain/SeatName";
import { MyGameDispatchContext } from "./Context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

const canLeave = (myGame: MyGameState, gameTableId: number): boolean => {
  if (myGame.gameTableId !== gameTableId) {
    return false;
  }
  return myGame.isSitDown();
};

type LeaveButtonProps = {
  myGameState: MyGameState;
  gameTableIdToLeave: number;
  onLeave?: (seatName: SeatName) => void;
  forceEnable?: boolean;
  children?: React.ReactNode;
};
export const LeaveButton: React.FC<LeaveButtonProps> = (props) => {
  const classes = useStyles();
  const myGameState = props.myGameState;
  const dispatcher = React.useContext(MyGameDispatchContext);

  const leave = (gameState: MyGameState): void => {
    if (props.onLeave) {
      props.onLeave(gameState.mySeatName);
    }
    dispatcher.leave(gameState.gameTableId, gameState.mySeatName);
  };

  const gameTableId = props.gameTableIdToLeave;
  return (
    <Button
      className={classes.actionButton}
      variant="contained"
      disabled={props.forceEnable ? false : !canLeave(myGameState, gameTableId)}
      onClick={(): void => leave(myGameState)}
    >
      {props.children || "席を外す"}
    </Button>
  );
};
LeaveButton.propTypes = {
  gameTableIdToLeave: PropTypes.number.isRequired,
  myGameState: PropTypes.instanceOf(MyGameState).isRequired,
  onLeave: PropTypes.func,
  forceEnable: PropTypes.bool,
  children: PropTypes.node,
};
