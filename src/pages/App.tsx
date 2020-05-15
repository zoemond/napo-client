import * as React from "react";
import { hot } from "react-hot-loader";
import { GameTablesProvider } from "../ducks/game_tables/Provider";
import { MyGameProvider } from "../ducks/my_game/Provider";
import { Router } from "./router/Router";
import { CssBaseline } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MyGameProvider>
        <GameTablesProvider>
          <Router />
        </GameTablesProvider>
      </MyGameProvider>
    </React.Fragment>
  );
};

export default hot(module)(App);
