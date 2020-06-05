import * as React from "react";
import * as PropTypes from "prop-types";

import { socket } from "../socket/socket";
import { RoundContext, RoundDispatchContext } from "./Context";
import reducer from "./reducer";
import { RoundState } from "./state";
import { TRoundAction, TURN } from "./types";

import { MyGameContext } from "../my_game/Context";
import { DeclarationResponse } from "../../response/DeclarationResponse";

import { RoundResponse } from "../../response/RoundResponse";

export const RoundProvider: React.FC = ({ children }): React.ReactElement => {
  const initialState = React.useContext(RoundContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<RoundState, TRoundAction>
  >(reducer, initialState);

  const { gameTableId } = React.useContext(MyGameContext);
  React.useEffect(() => {
    socket.on("round", (roundResponse: RoundResponse) => {
      console.log("round, dispatch", roundResponse);
      dispatch({
        type: TURN,
        payload: { gameTableId, roundResponse },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readRound = (gameTableId: number): void => {
    socket.emit("read_round", { gameTableId });
  };
  const startRound = (gameTableId: number): void => {
    socket.emit("start_round", { gameTableId });
  };
  const completeRound = (gameTableId: number): void => {
    socket.emit("complete_round", { gameTableId });
  };
  const calcScoreAndNewRound = (gameTableId: number): void => {
    socket.emit("calc_score_and_new_round", { gameTableId });
  };
  const open = (gameTableId: number): void => {
    socket.emit("open", { gameTableId });
  };

  return (
    <RoundContext.Provider value={state}>
      <RoundDispatchContext.Provider
        value={{
          startRound,
          completeRound,
          readRound,
          calcScoreAndNewRound,
          open,
        }}
      >
        {children}
      </RoundDispatchContext.Provider>
    </RoundContext.Provider>
  );
};

RoundProvider.propTypes = {
  children: PropTypes.node,
};
