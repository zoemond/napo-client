import * as React from "react";
import { hot } from "react-hot-loader";
import { GameTablesProvider } from "../ducks/game_tables/Provider";
import { MyGameProvider } from "../ducks/my_game/Provider";
import { Router } from "./router/Router";

const App: React.FC = () => {
  return (
    <MyGameProvider>
      <GameTablesProvider>
        <Router />
      </GameTablesProvider>
    </MyGameProvider>
  );
};

export default hot(module)(App);
