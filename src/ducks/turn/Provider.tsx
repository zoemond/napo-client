import * as React from "react";
import * as PropTypes from "prop-types";

import { socket } from "../socket/socket";
import { TurnContext, TurnDispatchContext } from "./Context";
import reducer from "./reducer";
import { TurnState } from "./state";
import { TTurnAction, TURN } from "./types";

import { MyGameContext } from "../my_game/Context";
import { DeclarationResponse } from "../../response/DeclarationResponse";

import { TurnResponse } from "../../response/TurnResponse";

export const TurnProvider: React.FC = ({ children }): React.ReactElement => {
  const initialState = React.useContext(TurnContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<TurnState, TTurnAction>
  >(reducer, initialState);

  const { gameTableId } = React.useContext(MyGameContext);
  React.useEffect(() => {
    socket.on("turn", (turnResponse: TurnResponse) => {
      console.log("turn, dispatch", turnResponse);
      dispatch({
        type: TURN,
        payload: { gameTableId, turnResponse },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readTurn = (gameTableId: number): void => {
    socket.emit("read_turn", { gameTableId });
  };
  const startTurn = (gameTableId: number): void => {
    socket.emit("start_turn", { gameTableId });
  };

  return (
    <TurnContext.Provider value={state}>
      <TurnDispatchContext.Provider value={{ startTurn, readTurn }}>
        {children}
      </TurnDispatchContext.Provider>
    </TurnContext.Provider>
  );
};

TurnProvider.propTypes = {
  children: PropTypes.node,
};
