import {Server, Socket} from "socket.io";

export interface EventInterface {
    listen(socket: Socket, io: Server): void
}
