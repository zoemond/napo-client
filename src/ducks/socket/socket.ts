import * as io from "socket.io-client";

class Socket {
  private socket: SocketIOClient.Socket;

  private get(): SocketIOClient.Socket {
    if (!this.socket) {
      this.socket = io(":7000");
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
