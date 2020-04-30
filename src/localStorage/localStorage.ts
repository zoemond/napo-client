import { MyGameState } from "../ducks/my_game/state";
import { isSeatName } from "../components/game-tables/Seats";

function getItem(key: string): string {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    // TODO: show error
    console.error(err);
  }
}

function setItem(key: string, value?: string | number): void {
  if (!value) {
    return;
  }
  try {
    localStorage.setItem(key, String(value));
  } catch (err) {
    // TODO: show error
    console.error(err);
  }
}

export function getMyGame(): MyGameState {
  const gameTableId = parseInt(getItem("gameTableId"));
  const seat = getItem("seat");
  if (isNaN(gameTableId) || !isSeatName(seat)) {
    return new MyGameState();
  }
  return new MyGameState({ gameTableId, seat });
}

export function setMyGame(game: MyGameState): void {
  setItem("gameTableId", game.gameTableId);
  setItem("seat", game.seat);
}
