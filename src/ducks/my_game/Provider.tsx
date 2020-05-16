import * as React from "react";
import * as PropTypes from "prop-types";

import { MyGameContext, MyGameDispatchContext } from "./Context";
import reducer from "./reducer";
import { TMyGameAction, SIT_DOWN, LEAVE_GAME } from "./types";
import { MyGameState } from "./state";
import * as storage from "../../localStorage/localStorage";
import { SeatName } from "../../domain/SeatName";
import { socket } from "../socket/socket";

const sendSitDownEvent = (
  gameTableId: number,
  seatName: SeatName,
  playerName = ""
): void => {
  socket.emit("sit_down", { gameTableId, seatName, playerName });
};

export const MyGameProvider: React.FC = ({ children }): React.ReactElement => {
  const initialMyGame = React.useContext(MyGameContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<MyGameState, TMyGameAction>
  >(reducer, initialMyGame);

  const sitDown = (
    gameTableId: number,
    mySeatName: SeatName,
    playerName: string
  ): void => {
    sendSitDownEvent(gameTableId, mySeatName, playerName);

    const myGameState = new MyGameState({ gameTableId, mySeatName });
    dispatch({ type: SIT_DOWN, payload: myGameState });
    // プレイヤー名だけでゲームを管理しているのでリロード, ブラウザバック時に stateが揮発しないように
    storage.setMyGame(myGameState);
  };
  const leave = (gameTableId: number, seatName: SeatName): void => {
    sendSitDownEvent(gameTableId, seatName);

    dispatch({ type: LEAVE_GAME });
    storage.removeMyGame();
  };

  const actions = { sitDown, leave };

  return (
    <MyGameContext.Provider value={state}>
      <MyGameDispatchContext.Provider value={actions}>
        {children}
      </MyGameDispatchContext.Provider>
    </MyGameContext.Provider>
  );
};

MyGameProvider.propTypes = {
  children: PropTypes.node,
};
