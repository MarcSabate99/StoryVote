import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";
import {User} from "../../../../Domain/Entity/User/User";

export class ChangeCreator {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public handle(
        user: User,
        roomNumber: RoomNumber
    ) {
        this.inMemoryRepository.changeCreator(user, roomNumber)
    }
}
