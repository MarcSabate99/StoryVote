import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {User} from "../../../Domain/Entity/User/User";
import {JoinRoomUseCaseRequest} from "../../../Application/UseCase/Room/JoinRoom/JoinRoomUseCaseRequest";
import {JoinRoomUseCase} from "../../../Application/UseCase/Room/JoinRoom/JoinRoomUseCase";
import {UserId} from "../../../Domain/ValueObject/User/UserId";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";
import {GetRoomUseCaseRequest} from "../../../Application/UseCase/Room/GetRoom/GetRoomUseCaseRequest";
import {GetRoomUseCase} from "../../../Application/UseCase/Room/GetRoom/GetRoomUseCase";
import {ChangeCreator} from "../../../Application/Service/Room/Creator/ChangeCreator";

export default class JoinRoomEvent implements EventInterface {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public listen(socket: Socket, io: Server) {
        socket.on('join room', (roomNumber: number, userName: string, isCreator: string) => {
            if (isCreator === "1") {
                const userId: UserId = {
                    value: socket.id
                }
                const user: User = {
                    id: userId,
                    name: userName
                }
                const room: RoomNumber = {
                    value: roomNumber
                }
                try{
                    const changeCreatorService = new ChangeCreator(this.inMemoryRepository);
                    changeCreatorService.handle(user, room);
                    const getRoomUseCaseRequest = new GetRoomUseCaseRequest(room);
                    const getRoomUseCase = new GetRoomUseCase(this.inMemoryRepository);
                    const response = getRoomUseCase.execute(getRoomUseCaseRequest);
                    if(response.room !== null) {
                        socket.join(roomNumber.toString());
                        socket.emit('joined room', response.room, socket.id);
                    }
                } catch (e) {

                }

                return;
            }
            const userId: UserId = {
                value: socket.id
            }
            const user: User = {
                name: userName,
                id: userId
            }
            const roomNumberObj: RoomNumber = {
                value: roomNumber
            }
            try {
                const joinRoomUseCaseRequest = new JoinRoomUseCaseRequest(roomNumberObj, user);
                const joinRoomUseCase = new JoinRoomUseCase(this.inMemoryRepository);
                const response = joinRoomUseCase.execute(joinRoomUseCaseRequest);
                if(response.room !== null) {
                    socket.join(roomNumber.toString());
                    socket.emit('joined room', response.room, userId.value);
                }
            } catch (e) {

            }
        });
    }
}
