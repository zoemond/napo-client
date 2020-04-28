import * as React from "react";
import { GameTablesState } from "./state";

export const GameTablesContext = React.createContext(new GameTablesState());
