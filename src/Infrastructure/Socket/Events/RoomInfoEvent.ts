import { EventInterface } from "../../Interface/Event/EventInterface";
import { Server, Socket } from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {GetRoomUseCaseRequest} from "../../../Application/UseCase/Room/GetRoom/GetRoomUseCaseRequest";
import {GetRoomUseCase} from "../../../Application/UseCase/Room/GetRoom/GetRoomUseCase";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";

export default class RoomInfoEvent implements EventInterface {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    listen(socket: Socket, io: Server) {
        socket.on('room info', (roomNumber: number, callback: (room: any) => void) => {
            const number:RoomNumber = {
                value: roomNumber
            }
            const getRoomUseCaseRequest = new GetRoomUseCaseRequest(number);
            const getRoomUseCase = new GetRoomUseCase(this.inMemoryRepository);
            const response = getRoomUseCase.execute(getRoomUseCaseRequest);
            if(response.room !== null) {
                callback(response);
            }
        });
    }
}
