import * as React from "react";
import * as PropTypes from "prop-types";

import { socket } from "../socket/socket";
import { GameCardsContext } from "./Context";
import reducer from "./reducer";
import { GameCardsState } from "./state";
import { TGameCardsAction } from "./types";
import { GameCardsResponse } from "../../response/GameCardsResponse";

export const GameCardsProvider: React.FC = ({
  children,
}): React.ReactElement => {
  const initialState = React.useContext(GameCardsContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<GameCardsState, TGameCardsAction>
  >(reducer, initialState);

  React.useEffect(() => {
    socket.on("game_cards", (response: GameCardsResponse) => {
      console.log("dispatch", response);
      dispatch({ type: "GAME_CARDS", payload: response });
    });
  }, []);

  return (
    <GameCardsContext.Provider value={state}>
      {children}
    </GameCardsContext.Provider>
  );
};

GameCardsProvider.propTypes = {
  children: PropTypes.node,
};
