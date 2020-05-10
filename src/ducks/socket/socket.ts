import * as io from "socket.io-client";

class Socket {
  private socket: SocketIOClient.Socket;

  private get(): SocketIOClient.Socket {
    if (!this.socket) {
      const host = process.env.SERVER_HOST || "";
      const port = process.env.SERVER_PORT || 7000;
      this.socket = io(host + ":" + port);
    }
    return this.socket;
  }

  on(event: string, fn: Function): void {
    this.get().on(event, fn);
  }

  emit(event: string, ...args: unknown[]): void {
    this.get().emit(event, args);
  }
}

export const socket = new Socket();
