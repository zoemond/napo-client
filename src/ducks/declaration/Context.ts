import * as React from "react";
import { DeclarationState } from "./state";
import { Declaration } from "../../domain/Declaration";

export const DeclarationContext = React.createContext(new DeclarationState());

type Dispatcher = {
  declare: (declaration: Declaration) => void;
  readDeclaration: (gameTableId: number) => void;
};
export const DeclarationDispatchContext = React.createContext<Dispatcher>(null);
