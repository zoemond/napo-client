import * as React from "react";
import { hot } from "react-hot-loader";
import { GameTablesPage } from "./game-tables/GameTables";
import SocketProvider from "../ducks/socket/SocketProvider";

const App: React.FC = () => {
  return (
    <SocketProvider>
      <GameTablesPage />
    </SocketProvider>
  );
};

export default hot(module)(App);
