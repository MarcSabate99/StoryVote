import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {SelectPointUseCaseRequest} from "../../../Application/UseCase/Point/SelectPoint/SelectPointUseCaseRequest";
import {UserId} from "../../../Domain/ValueObject/User/UserId";
import {SelectPointUseCase} from "../../../Application/UseCase/Point/SelectPoint/SelectPointUseCase";
import {GetRefreshedRoom} from "../../../Application/Service/Room/Refresh/GetRefreshedRoom";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";
import {Point} from "../../../Domain/ValueObject/Points/Point";

export default class SelectCardEvent implements EventInterface {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    listen(socket: Socket, io: Server) {
        socket.on('selected point', (id: string, points: number, roomNumber: number) => {
            const number: RoomNumber = {
                value: roomNumber
            }
            const point: Point = {
                value: points.toString()
            }
            const userId: UserId = {
                value: id
            }
            const selectPointRequest = new SelectPointUseCaseRequest(number, point, userId);
            const selectPointUseCase = new SelectPointUseCase(this.inMemoryRepository);
            selectPointUseCase.execute(selectPointRequest);

            const refresher = new GetRefreshedRoom(this.inMemoryRepository);
            const refreshedData = refresher.handle(number);

            socket.join(number.value.toString());
            io.to(number.value.toString()).emit('update points', refreshedData.votes);
        });
    }
}
