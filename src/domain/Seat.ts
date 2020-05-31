import { SeatName } from "./SeatName";
import Card from "./Card";

export class Seat {
  seatName: SeatName;
  playCard?: Card;
  faceCards: Card[] = [];
  hands: Card[] = [];
  score = 0;
  isAide = false;
  isLastLapWinner = false;

  constructor(
    seatName: SeatName,
    playCard?: Card,
    faceCards: Card[] = [],
    hands: Card[] = [],
    score = 0,
    isAide = false,
    isLastLapWinner = false
  ) {
    this.seatName = seatName;
    this.playCard = playCard;
    this.faceCards = faceCards;
    this.hands = hands;
    this.score = score;
    this.isAide = isAide;
    this.isLastLapWinner = isLastLapWinner;
  }

  static from(seatObj: Seat): Seat {
    return new Seat(
      seatObj.seatName,
      seatObj.playCard && Card.fromObj(seatObj.playCard),
      seatObj.faceCards.map(Card.fromObj),
      seatObj.hands.map(Card.fromObj),
      seatObj.score,
      seatObj.isAide,
      seatObj.isLastLapWinner
    );
  }
}
