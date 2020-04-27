import * as React from "react";
import { hot } from "react-hot-loader";
import { GameTablesPage } from "./game-tables/GameTables";

const App: React.FC = () => {
  return <GameTablesPage />;
};

export default hot(module)(App);
