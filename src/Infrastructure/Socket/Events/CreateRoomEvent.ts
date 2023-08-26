import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {CreateRoomUseCase} from "../../../Application/UseCase/Room/CreateRoom/CreateRoomUseCase";
import {CreateRoomUseCaseRequest} from "../../../Application/UseCase/Room/CreateRoom/CreateRoomUseCaseRequest";
import {UserId} from "../../../Domain/ValueObject/User/UserId";

export default class CreateRoomEvent implements EventInterface {
    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public listen(socket: Socket, io: Server) {
        socket.on('create room', (callback: (roomId: number) => void) => {
            const userId: UserId = {
                value: socket.id
            }
            const createRoomUseCaseRequest = new CreateRoomUseCaseRequest(userId);
            const createRoomUseCase = new CreateRoomUseCase(this.inMemoryRepository);
            const roomNumber = createRoomUseCase.execute(createRoomUseCaseRequest);
            callback(roomNumber.roomId);
        });
    }
}
