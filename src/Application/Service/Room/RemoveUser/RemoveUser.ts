import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";
import {UserId} from "../../../../Domain/ValueObject/User/UserId";

export class RemoveUser {
    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public handle(
        roomNumber: RoomNumber,
        userId: UserId
    ): void {
        this.inMemoryRepository.removeUserFromRoom(roomNumber, userId);
    }

}
