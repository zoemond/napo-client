import { SeatName } from "../../components/game-tables/Seats";

type MyGameProp = {
  gameTableId?: number;
  seat?: SeatName;
};

export class MyGameState {
  constructor(prop?: MyGameProp) {
    if (!prop) {
      return;
    }
    this.gameTableId = prop.gameTableId;
    this.seat = prop.seat;
  }
  gameTableId?: number;
  seat?: SeatName;

  isSitDown(): boolean {
    return !!(this.gameTableId && this.seat);
  }
}
