import * as React from "react";
import * as PropTypes from "prop-types";

import { socket } from "../socket/socket";
import { SeatsContext } from "./Context";
import reducer from "./reducer";
import { Seats } from "./state";
import { TGameCardsAction } from "./types";
import {
  SeatsResponse,
  SeatsSuccessResponse,
} from "../../response/GameCardsResponse";
import { MyGameContext } from "../my_game/Context";

export const SeatsProvider: React.FC = ({ children }): React.ReactElement => {
  const initialState = React.useContext(SeatsContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<Seats, TGameCardsAction>
  >(reducer, initialState);

  const { gameTableId } = React.useContext(MyGameContext);
  React.useEffect(() => {
    socket.on("seats", (response: SeatsResponse) => {
      console.log("dispatch, seats", response);
      // TODO: 今の所すべてのゲームの状態がブロードキャストされてくるのでどうにかする
      if ((response as SeatsSuccessResponse).gameTableId === gameTableId) {
        dispatch({ type: "GAME_CARDS", payload: response });
      }
    });
  }, []);

  return (
    <SeatsContext.Provider value={state}>{children}</SeatsContext.Provider>
  );
};

SeatsProvider.propTypes = {
  children: PropTypes.node,
};
