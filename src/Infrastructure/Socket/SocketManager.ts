import {Server, Socket} from "socket.io";
import CreateRoomEvent from "./Events/CreateRoomEvent";
import JoinRoomEvent from "./Events/JoinRoomEvent";
import RefreshEvent from "./Events/RefreshEvent";
import ResetPointsEvent from "./Events/ResetPointsEvent";
import RoomInfoEvent from "./Events/RoomInfoEvent";
import SelectCardEvent from "./Events/SelectCardEvent";
import ShowPointsEvent from "./Events/ShowPointsEvent";
import VoterEvent from "./Events/VoterEvent";
import {InMemoryRepositoryInterface} from "../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import LeaveRoom from "./Events/LeaveRoom";

export class SocketManager {

    constructor(
        private readonly io: Server,
        private readonly repository: InMemoryRepositoryInterface
    ) {
        this.repository = repository;
        this.io = io;
        const events = [
            new CreateRoomEvent(this.repository),
            new JoinRoomEvent(this.repository),
            new RefreshEvent(this.repository),
            new ResetPointsEvent(this.repository),
            new RoomInfoEvent(this.repository),
            new SelectCardEvent(this.repository),
            new ShowPointsEvent(this.repository),
            new VoterEvent(this.repository),
            new LeaveRoom(this.repository),
        ];
        this.io.on('connection', (socket: Socket) => {
            events.map(event => event.listen(socket, this.io));
        });
    }
}
