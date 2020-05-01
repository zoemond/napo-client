import * as React from "react";
import { GameCardsState } from "./state";

export const GameCardsContext = React.createContext(new GameCardsState());
