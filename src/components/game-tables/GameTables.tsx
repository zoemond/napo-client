import * as React from "react";
import { Button } from "@material-ui/core";

function createTable(): void {
  console.log("create");
}

export const GameTablesPage: React.FC = () => {
  return (
    <Button variant="contained" color="primary" onClick={createTable}>
      Create Game Table
    </Button>
  );
};
