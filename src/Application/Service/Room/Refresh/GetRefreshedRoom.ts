import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {GetVotes} from "../Votes/GetVotes";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class GetRefreshedRoom {
    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public handle(roomNumber: RoomNumber) {
        try {
            const getVotes = new GetVotes();
            const cards = this.inMemoryRepository.getRoomCards(roomNumber);
            const votes = getVotes.handle(cards);

            return { cards, votes };
        } catch (error) {
            return {
                cards: {},
                votes: [
                    { value: 0 },
                    { value: 0 }
                ]
            };
        }
    }
}
