export type TTopics = "general" | "randam";

export interface ISendMsg {
  msg: string;
  from: string;
  topic: TTopics;
}
