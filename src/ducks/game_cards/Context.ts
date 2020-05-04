import * as React from "react";
import { GameState } from "./state";

export const GameCardsContext = React.createContext(new GameState());
