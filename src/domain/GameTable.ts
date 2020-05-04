import { Player } from "./Player";
import { SeatName } from "./SeatName";

export default class GameTable {
  constructor(id: number, turnCount: number, players?: Player[]) {
    this.id = id;
    this.turnCount = turnCount;
    this.players = players || [];
  }
  id: number;
  turnCount: number;
  players: Player[];

  static from(gameTableObj: GameTable): GameTable {
    const gameTable = new GameTable(gameTableObj.id, gameTableObj.turnCount);
    gameTable.players = gameTableObj.players.map(
      (player) => new Player(player.seatName, player.name)
    );
    return gameTable;
  }

  firstPlayer(): Player {
    return this.findPlayer("first_seat");
  }
  secondPlayer(): Player {
    return this.findPlayer("second_seat");
  }
  thirdPlayer(): Player {
    return this.findPlayer("third_seat");
  }
  fourthPlayer(): Player {
    return this.findPlayer("fourth_seat");
  }
  fifthPlayer(): Player {
    return this.findPlayer("fifth_seat");
  }

  findPlayer(seatName: SeatName): Player {
    return (
      this.players.find((player) => player.seatName === seatName) ||
      new Player(seatName)
    );
  }

  isAllSitDown(): boolean {
    return !this.players.some((player) => !player.isSitDown());
  }
}
