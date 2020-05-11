import * as React from "react";
import * as PropTypes from "prop-types";

import { MyGameContext, MyGameDispatchContext } from "./Context";
import reducer from "./reducer";
import { TMyGameAction, SitDownAction, SIT_DOWN, LEAVE_GAME } from "./types";
import { MyGameState } from "./state";
import * as storage from "../../localStorage/localStorage";
import { isSeatName, SeatName } from "../../domain/SeatName";

export const MyGameProvider: React.FC = ({ children }): React.ReactElement => {
  const initialMyGame = React.useContext(MyGameContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<MyGameState, TMyGameAction>
  >(reducer, initialMyGame);

  // プレイヤー名だけでゲームを管理しているのでリロード, ブラウザバック時に
  // stateが揮発しないように
  const dispatchWithStorage = {
    sitDown: (gameTableId: number, mySeatName: SeatName): void => {
      const payload = new MyGameState({
        gameTableId,
        mySeatName,
      });
      dispatch({
        type: SIT_DOWN,
        payload,
      });
      storage.setMyGame(payload);
    },
    leave: (): void => {
      dispatch({ type: LEAVE_GAME });
      storage.removeMyGame();
    },
  };

  return (
    <MyGameContext.Provider value={state}>
      <MyGameDispatchContext.Provider value={dispatchWithStorage}>
        {children}
      </MyGameDispatchContext.Provider>
    </MyGameContext.Provider>
  );
};

MyGameProvider.propTypes = {
  children: PropTypes.node,
};
