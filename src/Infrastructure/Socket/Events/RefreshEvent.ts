import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {GetRefreshedRoom} from "../../../Application/Service/Room/Refresh/GetRefreshedRoom";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";

export default class RefreshEvent implements EventInterface {
    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    listen(socket: Socket, io: Server) {
        socket.on('refresh', (roomNumber: number) => {
            const refresher = new GetRefreshedRoom(this.inMemoryRepository);
            const number: RoomNumber = {
                value: roomNumber
            }
            const refreshedData = refresher.handle(number);
            socket.join(number.value.toString());
            io.to(roomNumber.toString()).emit("refresh room", refreshedData.cards, refreshedData.votes);
        });
    }
}
