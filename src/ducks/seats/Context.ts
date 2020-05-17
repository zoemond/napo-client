import * as React from "react";
import { Seats } from "./state";
import { SeatName } from "../../domain/SeatName";
import Card from "../../domain/Card";

export const SeatsContext = React.createContext(new Seats());

type Dispatcher = {
  readSeats: (gameTableId: number) => void;
  playCard: (gameTableId: number, card: Card, seatName: SeatName) => void;
};
export const SeatsDispatchContext = React.createContext<Dispatcher>(null);
