import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {ResetPointsUseCaseRequest} from "../../../Application/UseCase/Point/ResetPoints/ResetPointsUseCaseRequest";
import {ResetPointsUseCase} from "../../../Application/UseCase/Point/ResetPoints/ResetPointsUseCase";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";
import {GetRefreshedRoom} from "../../../Application/Service/Room/Refresh/GetRefreshedRoom";

export default class ResetPointsEvent implements EventInterface {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    listen(socket: Socket, io: Server) {
        socket.on('reset points', (roomNumber: number) => {
            const number: RoomNumber = {
                value: roomNumber
            }
            const resetPointsRequest = new ResetPointsUseCaseRequest(number);
            const resetPointsUseCase = new ResetPointsUseCase(this.inMemoryRepository);
            resetPointsUseCase.execute(resetPointsRequest);

            const refresher = new GetRefreshedRoom(this.inMemoryRepository);
            const refreshedData = refresher.handle(number);
            socket.join(number.value.toString());
            io.to(number.value.toString()).emit("refresh room", refreshedData.cards, refreshedData.votes);
        });
    }
}
