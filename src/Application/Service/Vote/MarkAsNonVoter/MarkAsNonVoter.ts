import {UserId} from "../../../../Domain/ValueObject/User/UserId";
import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class MarkAsNonVoter {
    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public handle(roomNumber: RoomNumber, userId: UserId): void {
        this.inMemoryRepository.markUserAsNonVoter(roomNumber, userId);
    }
}
