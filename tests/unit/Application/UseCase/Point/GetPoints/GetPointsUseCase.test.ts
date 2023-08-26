import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {PointMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Points/PointMother";
import {Point} from "../../../../../../src/Domain/ValueObject/Points/Point";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {
    GetPointsUseCaseRequest
} from "../../../../../../src/Application/UseCase/Point/GetPoints/GetPointsUseCaseRequest";
import {GetPointsUseCase} from "../../../../../../src/Application/UseCase/Point/GetPoints/GetPointsUseCase";

describe('GetPointsUseCase', () => {
    it('should get points for a given room', () => {
        const points:Point = PointMother.create(5);
        inMemoryRepositoryMock.getPoints.mockReturnValue(
            points
        )
        const roomId:RoomNumber = RoomNumberMother.create(1);
        const request = new GetPointsUseCaseRequest(roomId);
        const getPointsUseCase = new GetPointsUseCase(inMemoryRepositoryMock);
        const response = getPointsUseCase.execute(request);

        expect(response).toBeDefined();
        expect(response.points).toBe(points);
        expect(inMemoryRepositoryMock.getPoints).toHaveBeenCalledWith(roomId);
        expect(inMemoryRepositoryMock.getPoints).toHaveBeenCalledTimes(1);
    });
});
