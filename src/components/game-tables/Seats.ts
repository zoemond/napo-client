export type Seats = {
  seatFirst?: string;
  seatSecond?: string;
  seatThird?: string;
  seatFourth?: string;
  seatFifth?: string;
};

export type SeatName = keyof Seats;

export function isSeatName(name: string): name is SeatName {
  return [
    "seatFirst",
    "seatSecond",
    "seatThird",
    "seatFourth",
    "seatFifth",
  ].includes(name);
}
