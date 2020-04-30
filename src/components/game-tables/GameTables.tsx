import * as React from "react";
import { Button } from "@material-ui/core";
import { socket } from "../../ducks/socket/socket";
import { GameTablesState } from "../../ducks/game_tables/state";
import { GameTablesContext } from "../../ducks/game_tables/Context";

const createGameTable = (): void => {
  socket.emit("create_game_table");
};

export const GameTablesPage: React.FC = () => {
  const state = React.useContext<GameTablesState>(GameTablesContext);

  const tables = state.gameTables;
  tables.forEach((table) => {
    console.log("table: ", table);
  });
  return (
    <Button variant="contained" color="primary" onClick={createGameTable}>
      卓をたてる
    </Button>
  );
};
