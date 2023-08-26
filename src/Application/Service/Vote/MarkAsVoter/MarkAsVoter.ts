import {UserId} from "../../../../Domain/ValueObject/User/UserId";
import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class MarkAsVoter {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public handle(roomNumber: RoomNumber, userId: UserId): void {
        this.inMemoryRepository.markUserAsVoter(roomNumber, userId);
    }
}
