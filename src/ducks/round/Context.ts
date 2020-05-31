import * as React from "react";
import { RoundState } from "./state";

export const RoundContext = React.createContext(new RoundState());

type Dispatcher = {
  startRound: (gameTableId: number) => void;
  calcScoreAndNewRound: (gameTableId: number) => void;
  readRound: (gameTableId: number) => void;
  open: (gameTableId: number) => void;
};
export const RoundDispatchContext = React.createContext<Dispatcher>(null);
