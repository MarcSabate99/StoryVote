import { describe, expect, it, jest} from "@jest/globals";
import {ShowPoints} from "../../../../../../src/Application/Service/Point/ShowPoints/ShowPoints";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
describe('ShowPoints', () => {
    it('should call showPoints method', () => {
        const showPoints = new ShowPoints(inMemoryRepositoryMock);
        const roomNumber = RoomNumberMother.create(1)
        showPoints.handle(roomNumber);
        expect(inMemoryRepositoryMock.showPoints).toHaveBeenCalledWith(roomNumber);
    });
});
