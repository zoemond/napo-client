import * as React from "react";
import * as PropTypes from "prop-types";
import * as io from "socket.io-client";

import { TTopics, ISendMsg } from "./Response";
import { reducer, IActions } from "./Reducer";

const initState = {
  general: [],
  randam: [],
};

export type TChatIitemState = {
  from: string;
  msg: string;
};

export type TChatState = {
  [key in TTopics]: TChatIitemState[];
};

export interface SocketProviderStore {
  allChats?: TChatState;
  sendChatAction?: (value: ISendMsg) => void;
}

export const SocketContext = React.createContext<SocketProviderStore>({});

let socket: io.Socket;

const sendChatAction = (data: ISendMsg): void => {
  socket.emit("chat message", data);
};

const SocketProvider: React.FC = ({ children }): React.ReactElement => {
  const [allChats, dispatch] = React.useReducer<
    React.Reducer<TChatState, IActions>
  >(reducer, initState);

  if (!socket) {
    socket = io(":7000");
    socket.on("chat message", (data: ISendMsg) => {
      dispatch({ type: "RECEIVE_MESSAGE", payload: data });
    });
  }

  return (
    <SocketContext.Provider value={{ allChats, sendChatAction }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node,
};

export default SocketProvider;
