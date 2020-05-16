import * as React from "react";
import * as PropTypes from "prop-types";

import { Container, Button, makeStyles, createStyles } from "@material-ui/core";
import { GameState } from "../../ducks/game_cards/state";
import { GameCardsContext } from "../../ducks/game_cards/Context";
import { socket } from "../../ducks/socket/socket";
import { MyGameContext } from "../../ducks/my_game/Context";
import { MyGameState } from "../../ducks/my_game/state";
import MyGameSight from "../../domain/MyGameSight";
import GameTable from "../../domain/GameTable";
import Card from "../../domain/Card";
import { Declaration } from "../../domain/Declaration";
import {
  DeclarationResponse,
  DeclarationSuccessResponse,
} from "../../response/DeclarationResponse";
import { TurnResponse, TurnSuccessResponse } from "../../response/TurnResponse";
import { Turn } from "../../domain/Turn";
import { PlayingStage } from "./playing/PlayingStage";
import { DeclarationStage } from "./declaring/DeclarationStage";
import { SeatName } from "../../domain/SeatName";
import { LeaveButton } from "../../ducks/my_game/LeaveButton";

const useStyles = makeStyles(() =>
  createStyles({
    game: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

const initialDeclaration = new Declaration(
  0,
  "no_trump",
  "fifth_seat",
  "fifth_seat"
);

const initialTurn = new Turn(0, [new Card("spade", 0), new Card("spade", 0)]);
type GamePageProp = {
  gameTable: GameTable;
};
export const GamePage: React.FC<GamePageProp> = (props: GamePageProp) => {
  const myGameState = React.useContext<MyGameState>(MyGameContext);
  const gameTableId = myGameState.gameTableId;
  const classes = useStyles();
  const { seats } = React.useContext<GameState>(GameCardsContext);
  React.useEffect(() => {
    socket.emit("read_seats", { gameTableId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [declaration, setDeclaration] = React.useState<Declaration>(
    initialDeclaration
  );
  const [turn, setTurn] = React.useState<Turn>(initialTurn);
  React.useEffect(() => {
    socket.on("declaration", (response: DeclarationResponse) => {
      console.log("declaration, dispatch", response);
      const declarationObj = (response as DeclarationSuccessResponse)
        .declaration;
      if (declarationObj) {
        setDeclaration(Declaration.fromObj(declarationObj));
      }
    });
    socket.emit("read_declaration", { gameTableId });
    socket.on("turn", (response: TurnResponse) => {
      console.log("turn, dispatch", response);
      const turnObj = (response as TurnSuccessResponse).turn;
      if (turnObj && turnObj.openCards) {
        setTurn(Turn.fromObj(turnObj));
      }
    });
    socket.emit("read_turn", { gameTableId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!seats) {
    return <Container>empty</Container>;
  }

  const gameTable = props.gameTable;
  const startTurn = (): void => {
    socket.emit("start_turn", { gameTableId });
  };

  const findName = (seatName: SeatName): string => gameTable.findName(seatName);
  const myGameSight = new MyGameSight(myGameState.mySeatName, seats);

  return (
    <Container className={classes.game}>
      <div>
        <Button variant="contained" color="primary" onClick={startTurn}>
          カードを配る
        </Button>
        <LeaveButton
          gameTableIdToLeave={gameTable.id}
          myGameState={myGameState}
        />
      </div>
      {declaration.isDeclared() ? (
        <PlayingStage
          gameSight={myGameSight}
          findName={findName}
          discards={declaration.discards}
        />
      ) : (
        <DeclarationStage
          gameSight={myGameSight}
          findName={findName}
          openCards={turn.openCards}
          isOpened={turn.isOpened}
        />
      )}
    </Container>
  );
};

GamePage.propTypes = {
  gameTable: PropTypes.instanceOf(GameTable).isRequired,
};
