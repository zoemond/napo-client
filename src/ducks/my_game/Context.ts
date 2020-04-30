import * as React from "react";
import { MyGameState } from "./state";
import { TMyGameAction } from "./types";
import * as storage from "../../localStorage/localStorage";

export const MyGameContext = React.createContext<MyGameState>(
  storage.getMyGame()
);
export const MyGameDispatchContext = React.createContext<
  React.Dispatch<TMyGameAction>
>(null);
