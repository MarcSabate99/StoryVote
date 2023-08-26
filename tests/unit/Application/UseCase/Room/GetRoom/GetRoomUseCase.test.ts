import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {GetRoomUseCase} from "../../../../../../src/Application/UseCase/Room/GetRoom/GetRoomUseCase";
import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {Room} from "../../../../../../src/Domain/Entity/Room/Room";
import {RoomMother} from "../../../../../Utils/Stubs/Domain/Entity/Room/RoomMother";
import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";
import {Card} from "../../../../../../src/Domain/Entity/Card/Card";
import {User} from "../../../../../../src/Domain/Entity/User/User";

describe('GetRoomUseCase Unit Test', () => {
    it('should get a room by room number', () => {
        const roomNumber: RoomNumber = RoomNumberMother.create(1);
        const userId:UserId = UserIdMother.create("1");
        const emptyCard: Record<string, Card> = {};
        const emptyUser: Record<string, User> = {};
        const room:Room = RoomMother.create(
            userId,
            emptyUser,
            roomNumber,
            emptyCard,
            false
        );

        inMemoryRepositoryMock.getRoom.mockReturnValue(room);
        const getRoomUseCase = new GetRoomUseCase(inMemoryRepositoryMock);
        const request = { roomNumber };
        const response = getRoomUseCase.execute(request);
        expect(response).toBeDefined();
        expect(response.room).toEqual(room);
        expect(inMemoryRepositoryMock.getRoom).toHaveBeenCalledWith(roomNumber);
        expect(inMemoryRepositoryMock.getRoom).toHaveBeenCalledTimes(1);
    });
});
