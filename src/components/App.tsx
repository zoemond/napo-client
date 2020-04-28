import * as React from "react";
import { hot } from "react-hot-loader";
import { GameTablesPage } from "./game-tables/GameTables";
import { GameTablesProvider } from "../ducks/game_tables/Provider";

const App: React.FC = () => {
  return (
    <GameTablesProvider>
      <GameTablesPage />
    </GameTablesProvider>
  );
};

export default hot(module)(App);
