import * as React from "react";
import * as PropTypes from "prop-types";

import { socket } from "../socket/socket";
import { SeatsContext, SeatsDispatchContext } from "./Context";
import reducer from "./reducer";
import { Seats } from "./state";
import { TGameCardsAction } from "./types";
import {
  SeatsResponse,
  SeatsSuccessResponse,
} from "../../response/GameCardsResponse";
import { MyGameContext } from "../my_game/Context";
import Card from "../../domain/Card";
import { SeatName } from "../../domain/SeatName";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const readSeats = (gameTableId: number): void => {
    socket.emit("read_seats", { gameTableId });
  };
  const playCard = (
    gameTableId: number,
    card: Card,
    seatName: SeatName
  ): void => {
    socket.emit("play_card", { gameTableId, seatName, card });
  };

  return (
    <SeatsContext.Provider value={state}>
      <SeatsDispatchContext.Provider value={{ readSeats, playCard }}>
        {children}
      </SeatsDispatchContext.Provider>
    </SeatsContext.Provider>
  );
};

SeatsProvider.propTypes = {
  children: PropTypes.node,
};
