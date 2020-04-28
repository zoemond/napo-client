import { TTopics } from "./Response";
import { TChatState } from "./SocketProvider";

interface IAddChat {
  type: "RECEIVE_MESSAGE";
  payload: {
    from: string;
    msg: string;
    topic: TTopics;
  };
}
export type IActions = IAddChat;
// ↑アクションが増えたら↓こうする予定
//  type IActions = IAddChat | IUpdateAction | IDeleteAction

export const reducer = (state: TChatState, action: IActions): TChatState => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }],
      };
    default:
      return state;
  }
};
