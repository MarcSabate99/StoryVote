import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {UserId} from "../../../Domain/ValueObject/User/UserId";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";
import {RemoveUser} from "../../../Application/Service/Room/RemoveUser/RemoveUser";
import {GetRefreshedRoom} from "../../../Application/Service/Room/Refresh/GetRefreshedRoom";

export default class LeaveRoom implements EventInterface {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    listen(socket: Socket, io: Server): void {
        socket.on('leave room', (id: string, roomId: number) => {
            const userId: UserId = {
                value: id
            }
            const roomNumber: RoomNumber = {
                value: roomId
            }

            const removeUserFromRoom = new RemoveUser(
                this.inMemoryRepository
            );

            if(roomId === null){
                return;
            }

            removeUserFromRoom.handle(
                roomNumber,
                userId
            );
            const refresher = new GetRefreshedRoom(this.inMemoryRepository);
            const refreshedData = refresher.handle(roomNumber);

            io.to(roomNumber.value.toString()).emit("refresh room", refreshedData.cards, refreshedData.votes);
        })
    }

}

