import * as React from "react";
import { TurnState } from "./state";

export const TurnContext = React.createContext(new TurnState());

type Dispatcher = {
  startTurn: (gameTableId: number) => void;
  readTurn: (gameTableId: number) => void;
  open: (gameTableId: number) => void;
};
export const TurnDispatchContext = React.createContext<Dispatcher>(null);
