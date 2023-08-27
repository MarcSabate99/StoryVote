import {ResetPointsUseCase} from "../../../../../../src/Application/UseCase/Point/ResetPoints/ResetPointsUseCase";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {
    ResetPointsUseCaseRequest
} from "../../../../../../src/Application/UseCase/Point/ResetPoints/ResetPointsUseCaseRequest";

describe('ResetPointsUseCase', () => {
    it('should reset points for a given room', () => {
        const roomId = RoomNumberMother.create(1);
        const resetPointsUseCase = new ResetPointsUseCase(inMemoryRepositoryMock);
        const request = new ResetPointsUseCaseRequest(roomId);
        resetPointsUseCase.execute(request);
        expect(inMemoryRepositoryMock.resetPoints).toHaveBeenCalledWith(roomId);
        expect(inMemoryRepositoryMock.resetPoints).toHaveBeenCalledTimes(1);
    });
});
