import * as React from "react";
import { Button } from "@material-ui/core";
import { socket } from "../../ducks/socket/socket";
import { GameTablesState } from "../../ducks/game_tables/state";
import { GameTablesContext } from "../../ducks/game_tables/Context";
import { TableSeats } from "./TableSeats";

const createGameTable = (): void => {
  socket.emit("create_game_table");
};

export const GameTablesPage: React.FC = () => {
  React.useEffect(() => {
    socket.emit("read_game_tables");
    console.log("emit read game tables");
  }, []);

  const state = React.useContext<GameTablesState>(GameTablesContext);
  return (
    <div>
      <Button variant="contained" color="primary" onClick={createGameTable}>
        卓をたてる
      </Button>
      {state.gameTables.map((gameTable, i) => (
        <TableSeats key={i} gameTable={gameTable} />
      ))}
    </div>
  );
};
