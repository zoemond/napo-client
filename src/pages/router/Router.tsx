import * as React from "react";
import { GamePage } from "../game/Game";
import { MyGameContext } from "../../ducks/my_game/Context";
import { GameTablesContext } from "../../ducks/game_tables/Context";
import { GameTablesPage } from "../game-tables/GameTables";
import { MyGameState } from "../../ducks/my_game/state";
import GameTable from "../../domain/GameTable";
import { SeatsProvider } from "../../ducks/seats/Provider";
import { DeclarationProvider } from "../../ducks/declaration/Provider";
import { RoundProvider } from "../../ducks/round/Provider";

const findMyGameTable = (
  gameState: MyGameState,
  gameTables: GameTable[]
): GameTable | undefined => {
  const gameTableId = gameState.gameTableId;
  if (!gameState.gameTableId || !gameState.mySeatName) {
    return undefined;
  }
  if (!gameTables || gameTables.length < 1) {
    return undefined;
  }
  const gameTable = gameTables.find(
    (gameTable) => gameTable.id === gameTableId
  );
  if (!gameTable) {
    return undefined;
  }
  return gameTable;
};

// 一般的なRouterを使いません。
// url直打ちやブラウザバックに対応ないことで、 ページ遷移による管理を考えないようにします。
export const Router: React.FC = () => {
  const myGame = React.useContext(MyGameContext);
  const gamesTableState = React.useContext(GameTablesContext);
  const joinedGameTable = findMyGameTable(myGame, gamesTableState.gameTables);

  if (joinedGameTable && joinedGameTable.isAllSitDown()) {
    return (
      <SeatsProvider>
        <RoundProvider>
          <DeclarationProvider>
            <GamePage gameTable={joinedGameTable} />
          </DeclarationProvider>
        </RoundProvider>
      </SeatsProvider>
    );
  }
  return <GameTablesPage />;
};
