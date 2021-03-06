import * as React from "react";
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Container,
} from "@material-ui/core";
import { socket } from "../../ducks/socket/socket";
import { GameTablesState } from "../../ducks/game_tables/state";
import { GameTablesContext } from "../../ducks/game_tables/Context";
import { TableSeats } from "./TableSeats";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";
import { MyGameContext } from "../../ducks/my_game/Context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createGame: {
      margin: theme.spacing(1),
    },
  })
);
const createGameTable = (): void => {
  socket.emit("create_game_table");
};
export const GameTablesPage: React.FC = () => {
  React.useEffect(() => {
    socket.emit("read_game_tables");
    console.log("emit read game tables");
  }, []);

  const state = React.useContext(GameTablesContext);
  const myGameState = React.useContext(MyGameContext);
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <div>
        <Button
          className={classes.createGame}
          variant="contained"
          color="primary"
          onClick={createGameTable}
        >
          卓をたてる
        </Button>
        {/* テストリリース用.(テーブル変更した場合など)ローカルストレージをリセットする */}
        <LeaveButton
          gameTableIdToLeave={0}
          myGameState={myGameState}
          forceEnable
        >
          何が何でも席を外す
        </LeaveButton>
      </div>
      {state.gameTables.map((gameTable, i) => (
        <TableSeats key={gameTable.id + "-" + i} gameTable={gameTable} />
      ))}
    </Container>
  );
};
