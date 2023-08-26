import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {GetPointsUseCase} from "../../../Application/UseCase/Point/GetPoints/GetPointsUseCase";
import {GetPointsUseCaseRequest} from "../../../Application/UseCase/Point/GetPoints/GetPointsUseCaseRequest";
import {ShowPoints} from "../../../Application/Service/Point/ShowPoints/ShowPoints";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";

export default class ShowPointsEvent implements EventInterface {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    listen(socket: Socket, io: Server) {
        socket.on('show points', (roomNumber: number) => {
            const number: RoomNumber = {
                value: roomNumber
            }
            const getPointsUseCaseRequest = new GetPointsUseCaseRequest(number);
            const getPointsUseCase = new GetPointsUseCase(this.inMemoryRepository);
            const response = getPointsUseCase.execute(getPointsUseCaseRequest);
            const showPoints = new ShowPoints(this.inMemoryRepository);
            showPoints.handle(number);
            socket.join(number.value.toString());
            io.to(number.value.toString()).emit('show points', response.points);
        });
    }
}
