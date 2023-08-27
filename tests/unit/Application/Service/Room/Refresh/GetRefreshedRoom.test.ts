import {GetRefreshedRoom} from "../../../../../../src/Application/Service/Room/Refresh/GetRefreshedRoom";
import {RoomNoExistsException} from "../../../../../../src/Infrastructure/Exception/Room/RoomNoExistsException";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";

describe('GetRefreshedRoom', () => {
    let getRefreshedRoom: GetRefreshedRoom;

    beforeEach(() => {
        getRefreshedRoom = new GetRefreshedRoom(inMemoryRepositoryMock);
    });

    it('should return cards and votes', () => {
        const roomNumber = RoomNumberMother.create(1);
        const cardsData = {
            "user1": {points: 5, voter: true},
            "user2": {points: 3, voter: true},
            "user3": {points: 3, voter: false},
        };

        inMemoryRepositoryMock.getRoomCards.mockReturnValue(cardsData)
        const result = getRefreshedRoom.handle(roomNumber);

        expect(result.cards).toEqual(cardsData);
        expect(result.votes).toEqual([{value: 2}, {value: 3}]);
    });

    it('should handle error and return default values', () => {
        inMemoryRepositoryMock.getRoomCards.mockImplementation(() => {
            throw new RoomNoExistsException().toError();
        });
        const roomNumber = RoomNumberMother.create(1);
        const result = getRefreshedRoom.handle(roomNumber);
        expect(result.cards).toEqual({});
        expect(result.votes).toEqual([{value: 0}, {value: 0}]);
    });
});
