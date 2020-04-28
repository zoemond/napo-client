import * as React from "react";
import { Button } from "@material-ui/core";
import {
  SocketProviderStore,
  SocketContext,
} from "../../ducks/socket/SocketProvider";

function createTable(): void {
  console.log("create");
}

export const GameTablesPage: React.FC = () => {
  const { allChats, sendChatAction } = React.useContext<SocketProviderStore>(
    SocketContext
  );

  return (
    <Button variant="contained" color="primary" onClick={createTable}>
      Create Game Table
    </Button>
  );
};
