import * as React from "react";
import { GamePage } from "../game/Game";
import { MyGameContext } from "../../ducks/my_game/Context";
import { GameTablesContext } from "../../ducks/game_tables/Context";
import { GameTablesPage } from "../game-tables/GameTables";
import { MyGameState } from "../../ducks/my_game/state";
import GameTable from "../../domain/GameTable";
import { GameCardsProvider } from "../../ducks/game_cards/Provider";

const hasMyGame = (
  gameState: MyGameState,
  gameTables: GameTable[]
): boolean => {
  const gameTableId = gameState.gameTableId;
  if (!gameState.gameTableId || !gameState.mySeatName) {
    return false;
  }
  if (!gameTables || gameTables.length < 1) {
    return false;
  }
  const gameTable = gameTables.find(
    (gameTable) => gameTable.id === gameTableId
  );
  if (!gameTable) {
    return false;
  }
  return gameTable.isAllSitDown();
};

// 一般的なRouterを使いません。
// url直打ちやブラウザバックに対応ないことで、 ページ遷移による管理を考えないようにします。
export const Router: React.FC = () => {
  const myGame = React.useContext(MyGameContext);
  const gamesTableState = React.useContext(GameTablesContext);

  if (hasMyGame(myGame, gamesTableState.gameTables)) {
    return (
      <GameCardsProvider>
        <GamePage />
      </GameCardsProvider>
    );
  }
  return <GameTablesPage />;
};
