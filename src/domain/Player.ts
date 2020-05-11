import { SeatName } from "./SeatName";

export class Player {
  constructor(seatName: SeatName, name?: string) {
    this.seatName = seatName;
    this.name = name || null;
  }
  seatName: SeatName;
  name?: string;

  isSitDown(): boolean {
    return !!this.name;
  }
}
