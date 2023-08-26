import {JoinRoomUseCaseResponse} from "./JoinRoomUseCaseResponse";
import {JoinRoomUseCaseRequest} from "./JoinRoomUseCaseRequest";
import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";

export class JoinRoomUseCase {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public execute(joinRoomUseCaseRequest: JoinRoomUseCaseRequest): JoinRoomUseCaseResponse {
        this.inMemoryRepository.joinRoom(joinRoomUseCaseRequest.user, joinRoomUseCaseRequest.roomId);
        const room = this.inMemoryRepository.getRoom(joinRoomUseCaseRequest.roomId);
        return new JoinRoomUseCaseResponse(room);
    }
}
