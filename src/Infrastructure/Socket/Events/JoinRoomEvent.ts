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

const IS_CREATOR = "1";
const UNDEFINED = "undefined";
const ROOM_NO_EXISTS_EVENT = 'room no exists';

export default class JoinRoomEvent implements EventInterface {
    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public listen(socket: Socket, io: Server) {
        socket.on('join room', (roomNumber: number, userName: string, isCreator: string) => {
            const userId: UserId = {
                value: socket.id
            }
            const user: User = {
                id: userId,
                name: userName
            }
            const roomNumberObj: RoomNumber = {
                value: roomNumber
            }
            if (isCreator === IS_CREATOR) {
                try{
                    const changeCreatorService = new ChangeCreator(this.inMemoryRepository);
                    changeCreatorService.handle(user, roomNumberObj);
                    const getRoomUseCaseRequest = new GetRoomUseCaseRequest(roomNumberObj);
                    const getRoomUseCase = new GetRoomUseCase(this.inMemoryRepository);
                    const response = getRoomUseCase.execute(getRoomUseCaseRequest);
                    if(response.room !== null && typeof response.room !== UNDEFINED) {
                        socket.join(roomNumber.toString());
                        socket.emit('joined room', response.room, socket.id);
                    } else {
                        socket.emit(ROOM_NO_EXISTS_EVENT);
                    }
                } catch (e) {
                    socket.emit(ROOM_NO_EXISTS_EVENT);
                }

                return;
            }
            try {
                const joinRoomUseCaseRequest = new JoinRoomUseCaseRequest(roomNumberObj, user);
                const joinRoomUseCase = new JoinRoomUseCase(this.inMemoryRepository);
                const response = joinRoomUseCase.execute(joinRoomUseCaseRequest);
                if(response.room !== null && typeof response.room !== UNDEFINED) {
                    socket.join(roomNumber.toString());
                    socket.emit('joined room', response.room, userId.value);
                } else {
                    socket.emit(ROOM_NO_EXISTS_EVENT);
                }
            } catch (e) {
                socket.emit(ROOM_NO_EXISTS_EVENT);
            }
        });
    }
}
