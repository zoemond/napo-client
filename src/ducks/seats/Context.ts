import * as React from "react";
import { Seats } from "./state";

export const SeatsContext = React.createContext(new Seats());

type Dispatcher = {
  readSeats: (gameTableId: number) => void;
};
export const SeatsDispatchContext = React.createContext<Dispatcher>(null);
