export default class GameTable {
  static from(gameTableObj: GameTable): GameTable {
    const gameTable = new GameTable();
    gameTable.id = gameTableObj.id;
    gameTable.turnCount = gameTableObj.turnCount;
    gameTable.seatFirst = gameTableObj.seatFirst;
    gameTable.seatSecond = gameTableObj.seatSecond;
    gameTable.seatThird = gameTableObj.seatThird;
    gameTable.seatFourth = gameTableObj.seatFourth;
    gameTable.seatFifth = gameTableObj.seatFifth;
    return gameTable;
  }

  id: number;
  turnCount: number;
  seatFirst: string;
  seatSecond: string;
  seatThird: string;
  seatFourth: string;
  seatFifth: string;

  isAllSitDown(): boolean {
    return !(
      !this.seatFirst ||
      !this.seatSecond ||
      !this.seatThird ||
      !this.seatFourth ||
      !this.seatFifth
    );
  }
}
