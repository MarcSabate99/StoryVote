import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class ShowPoints {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public handle(roomNumber: RoomNumber): void {
        this.inMemoryRepository.showPoints(roomNumber);
    }
}
