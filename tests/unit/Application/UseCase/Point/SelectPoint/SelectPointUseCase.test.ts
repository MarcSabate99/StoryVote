import {SelectPointUseCase} from "../../../../../../src/Application/UseCase/Point/SelectPoint/SelectPointUseCase";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";
import {PointMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Points/PointMother";
import {
    SelectPointUseCaseRequest
} from "../../../../../../src/Application/UseCase/Point/SelectPoint/SelectPointUseCaseRequest";

describe('SelectPointUseCase Unit Test', () => {
    it('should select point for a user in a room', () => {
        const roomId = RoomNumberMother.create(1);
        const userId = UserIdMother.create("123");
        const points = PointMother.create(4);
        const selectPointUseCase = new SelectPointUseCase(inMemoryRepositoryMock);
        const request = new SelectPointUseCaseRequest(
            roomId,
            points,
            userId
        );
        selectPointUseCase.execute(request);
        expect(inMemoryRepositoryMock.selectPoint).toHaveBeenCalledWith(roomId, userId, points);
        expect(inMemoryRepositoryMock.selectPoint).toHaveBeenCalledTimes(1);
    });
});
