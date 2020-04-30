import * as React from "react";
import * as PropTypes from "prop-types";

import { MyGameContext, MyGameDispatchContext } from "./Context";
import reducer from "./reducer";
import { TMyGameAction, SitDownAction } from "./types";
import { MyGameState } from "./state";
import * as storage from "../../localStorage/localStorage";

export const MyGameProvider: React.FC = ({ children }): React.ReactElement => {
  const initialMyGame = React.useContext(MyGameContext);
  const [state, dispatch] = React.useReducer<
    React.Reducer<MyGameState, TMyGameAction>
  >(reducer, initialMyGame);

  // プレイヤー名だけでゲームを管理しているのでリロード, ブラウザバック時に
  // stateが揮発しないように
  const dispatchWithStorage = (action: TMyGameAction): void => {
    dispatch(action);
    storage.setMyGame((action as SitDownAction).payload);
  };
  return (
    <MyGameContext.Provider value={state}>
      <MyGameDispatchContext.Provider value={dispatchWithStorage}>
        {children}
      </MyGameDispatchContext.Provider>
    </MyGameContext.Provider>
  );
};

MyGameProvider.propTypes = {
  children: PropTypes.node,
};
