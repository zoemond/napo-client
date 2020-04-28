import * as React from "react";
import * as PropTypes from "prop-types";

import { socket } from "../socket/socket";
import { GameTablesContext } from "./Context";
import reducer from "./reducer";
import { GameTablesState } from "./state";
import { TGameTablesAction } from "./types";
import { GameTablesResponse } from "../../response/GameTablesResponse";

export const GameTablesProvider: React.FC = ({
  children,
}): React.ReactElement => {
  const store = React.useContext(GameTablesContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<GameTablesState, TGameTablesAction>
  >(reducer, store);

  socket.on("game_tables", (response: GameTablesResponse) => {
    console.log("dispatch", response);
    dispatch({ type: "GAME_TABLES", payload: response });
  });

  return (
    <GameTablesContext.Provider value={state}>
      {children}
    </GameTablesContext.Provider>
  );
};

GameTablesProvider.propTypes = {
  children: PropTypes.node,
};
