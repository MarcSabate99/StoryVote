import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {CreateRoomUseCaseResponse} from "./CreateRoomUseCaseResponse";
import {CreateRoomUseCaseRequest} from "./CreateRoomUseCaseRequest";

export class CreateRoomUseCase {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public execute(createRoomUseCaseRequest: CreateRoomUseCaseRequest): CreateRoomUseCaseResponse {
        const roomId = this.inMemoryRepository.createRoom(createRoomUseCaseRequest.userId);
        return new CreateRoomUseCaseResponse(roomId.value);
    }
}
