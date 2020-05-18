import Card from "./Card";
import { SeatName, orderedSeatNames } from "./SeatName";
import { Seat } from "./Seat";
const handsOrder = {
  spade: 4,
  heart: 3,
  club: 2,
  diamond: 1,
};

export default class MyGameSight {
  mySeat: Seat;
  leftSeat: Seat;
  frontLeftSeat: Seat;
  frontRightSeat: Seat;
  rightSeat: Seat;

  constructor(mySeatName: SeatName, seats: Seat[]) {
    const myIdx = seats.findIndex((seat) => seat.seatName === mySeatName);
    this.mySeat = seats[myIdx];
    this.leftSeat = this.findSeatNextTo(myIdx, 1, seats);
    this.frontLeftSeat = this.findSeatNextTo(myIdx, 2, seats);
    this.frontRightSeat = this.findSeatNextTo(myIdx, 3, seats);
    this.rightSeat = this.findSeatNextTo(myIdx, 4, seats);
  }

  private findSeatNextTo(
    baseIdx: number,
    nextMeNum: number,
    seats: Seat[]
  ): Seat {
    const idx = (baseIdx + nextMeNum) % orderedSeatNames.length;
    const seatName = orderedSeatNames[idx];
    return seats.find((seat) => seat.seatName === seatName);
  }

  myHands(): Card[] {
    return this.mySeat.hands.sort((card1, card2) => {
      const suitOrder = handsOrder[card2.suit] - handsOrder[card1.suit];
      if (suitOrder) {
        return suitOrder;
      }
      if (card2.number === 1) {
        return -1;
      }
      if (card1.number === 1) {
        return 1;
      }
      return card1.number - card2.number;
    });
  }
  leftCard(): Card {
    return this.leftSeat.playCard;
  }
  frontLeftCard(): Card {
    return this.frontLeftSeat.playCard;
  }
  frontRightCard(): Card {
    return this.frontRightSeat.playCard;
  }
  rightCard(): Card {
    return this.rightSeat.playCard;
  }

  isMyRound(): boolean {
    if (this.mySeat.playCard) {
      return false;
    }
    if (this.rightCard()) {
      return true;
    }
    return this.mySeat.isLastLapWinner;
  }
}
