export type SeatName =
  | "first_seat"
  | "second_seat"
  | "third_seat"
  | "fourth_seat"
  | "fifth_seat";
export const orderedSeatNames: SeatName[] = [
  "first_seat",
  "second_seat",
  "third_seat",
  "fourth_seat",
  "fifth_seat",
];
export function isSeatName(name: string): name is SeatName {
  return orderedSeatNames.includes(name as SeatName);
}
