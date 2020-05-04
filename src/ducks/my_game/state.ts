import { SeatName } from "../../domain/SeatName";

type MyGameProp = {
  gameTableId?: number;
  mySeatName?: SeatName;
};

export class MyGameState {
  constructor(prop?: MyGameProp) {
    if (!prop) {
      return;
    }
    this.gameTableId = prop.gameTableId;
    this.mySeatName = prop.mySeatName;
  }
  gameTableId?: number;
  mySeatName?: SeatName;

  isSitDown(): boolean {
    return !!(this.gameTableId && this.mySeatName);
  }
}
