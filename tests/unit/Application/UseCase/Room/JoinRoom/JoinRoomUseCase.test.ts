import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {JoinRoomUseCase} from "../../../../../../src/Application/UseCase/Room/JoinRoom/JoinRoomUseCase";
import {User} from "../../../../../../src/Domain/Entity/User/User";
import {UserMother} from "../../../../../Utils/Stubs/Domain/Entity/User/UserMother";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";
import {RoomMother} from "../../../../../Utils/Stubs/Domain/Entity/Room/RoomMother";
import {Card} from "../../../../../../src/Domain/Entity/Card/Card";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {JoinRoomUseCaseRequest} from "../../../../../../src/Application/UseCase/Room/JoinRoom/JoinRoomUseCaseRequest";

describe('JoinRoomUseCase Unit Test', () => {
    it('should allow a user to join a room', () => {
        const userId = UserIdMother.create("1");
        const user = UserMother.create("test", userId);
        const roomNumber = RoomNumberMother.create(1);
        const emptyCard: Record<string, Card> = {};
        const emptyUser: Record<string, User> = {};
        const room = RoomMother.create(
            userId,
            emptyUser,
            roomNumber,
            emptyCard,
            false
        );
        inMemoryRepositoryMock.getRoom.mockReturnValue(room);
        const joinRoomUseCase = new JoinRoomUseCase(inMemoryRepositoryMock);
        const request:JoinRoomUseCaseRequest = new JoinRoomUseCaseRequest(
            roomNumber,
            user
        )
        const response = joinRoomUseCase.execute(request);
        expect(response).toBeDefined();
        expect(response.room).toEqual(room);
        expect(inMemoryRepositoryMock.joinRoom).toHaveBeenCalledWith(user, roomNumber);
        expect(inMemoryRepositoryMock.joinRoom).toHaveBeenCalledTimes(1);
        expect(inMemoryRepositoryMock.getRoom).toHaveBeenCalledWith(roomNumber);
        expect(inMemoryRepositoryMock.getRoom).toHaveBeenCalledTimes(1);
    });
});
