import * as React from "react";
import * as PropTypes from "prop-types";

import { socket } from "../socket/socket";
import { DeclarationContext, DeclarationDispatchContext } from "./Context";
import reducer from "./reducer";
import { DeclarationState } from "./state";
import { TDeclarationAction, DECLARATION } from "./types";

import { MyGameContext } from "../my_game/Context";
import { DeclarationResponse } from "../../response/DeclarationResponse";

import { Declaration } from "../../domain/Declaration";

export const DeclarationProvider: React.FC = ({
  children,
}): React.ReactElement => {
  const initialState = React.useContext(DeclarationContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<DeclarationState, TDeclarationAction>
  >(reducer, initialState);

  const { gameTableId } = React.useContext(MyGameContext);
  React.useEffect(() => {
    socket.on("declaration", (declarationResponse: DeclarationResponse) => {
      console.log("declaration, dispatch", declarationResponse);
      dispatch({
        type: DECLARATION,
        payload: { gameTableId, declarationResponse },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readDeclaration = (gameTableId: number): void => {
    socket.emit("read_declaration", { gameTableId });
  };
  const declare = (declaration: Declaration): void => {
    socket.emit("declare_trump", { ...declaration, gameTableId });
  };

  return (
    <DeclarationContext.Provider value={state}>
      <DeclarationDispatchContext.Provider value={{ declare, readDeclaration }}>
        {children}
      </DeclarationDispatchContext.Provider>
    </DeclarationContext.Provider>
  );
};

DeclarationProvider.propTypes = {
  children: PropTypes.node,
};
