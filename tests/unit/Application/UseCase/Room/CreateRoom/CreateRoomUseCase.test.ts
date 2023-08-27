import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {CreateRoomUseCase} from "../../../../../../src/Application/UseCase/Room/CreateRoom/CreateRoomUseCase";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {
    CreateRoomUseCaseRequest
} from "../../../../../../src/Application/UseCase/Room/CreateRoom/CreateRoomUseCaseRequest";

describe('CreateRoomUseCase Unit Test', () => {
    it('should create a room and return its ID', () => {
        const userId = UserIdMother.create("1");
        const roomId = RoomNumberMother.create(1);
        inMemoryRepositoryMock.createRoom.mockReturnValue(roomId)
        const createRoomUseCase = new CreateRoomUseCase(inMemoryRepositoryMock);
        const request:CreateRoomUseCaseRequest = new CreateRoomUseCaseRequest(userId);
        const response = createRoomUseCase.execute(request);
        expect(response).toBeDefined();
        expect(response.roomId).toBe(roomId.value);
        expect(inMemoryRepositoryMock.createRoom).toHaveBeenCalledWith(userId);
        expect(inMemoryRepositoryMock.createRoom).toHaveBeenCalledTimes(1);
    });
});
