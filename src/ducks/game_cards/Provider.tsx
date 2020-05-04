import * as React from "react";
import * as PropTypes from "prop-types";

import * as storage from "../../localStorage/localStorage";
import { socket } from "../socket/socket";
import { GameCardsContext } from "./Context";
import reducer from "./reducer";
import { GameState } from "./state";
import { TGameCardsAction } from "./types";
import {
  SeatsResponse,
  SeatsSuccessResponse,
} from "../../response/GameCardsResponse";
import { MyGameContext } from "../my_game/Context";

export const GameCardsProvider: React.FC = ({
  children,
}): React.ReactElement => {
  const initialState = React.useContext(GameCardsContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<GameState, TGameCardsAction>
  >(reducer, initialState);

  const { gameTableId } = React.useContext(MyGameContext);
  React.useEffect(() => {
    socket.on("seats", (response: SeatsResponse) => {
      console.log("dispatch", response);
      // TODO: 今の所すべてのゲームの状態がブロードキャストされてくるのでどうにかする
      if ((response as SeatsSuccessResponse).gameTableId === gameTableId) {
        dispatch({ type: "GAME_CARDS", payload: response });
      }
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
