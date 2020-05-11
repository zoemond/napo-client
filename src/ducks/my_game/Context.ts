import * as React from "react";
import { MyGameState } from "./state";
import * as storage from "../../localStorage/localStorage";
import { SeatName } from "../../domain/SeatName";

export const MyGameContext = React.createContext<MyGameState>(
  storage.getMyGame()
);
type Dispatcher = {
  sitDown: (gameTableId: number, mySeatName: SeatName) => void;
  leave: () => void;
};
export const MyGameDispatchContext = React.createContext<Dispatcher>(null);
