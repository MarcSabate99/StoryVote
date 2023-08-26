import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {GetRoomUseCaseResponse} from "./GetRoomUseCaseResponse";
import {GetRoomUseCaseRequest} from "./GetRoomUseCaseRequest";

export class GetRoomUseCase {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public execute(getRoomUseCaseRequest: GetRoomUseCaseRequest): GetRoomUseCaseResponse {
        const room = this.inMemoryRepository.getRoom(getRoomUseCaseRequest.roomNumber);
        return new GetRoomUseCaseResponse(
            room
        );
    }
}
