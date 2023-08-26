import { describe, expect, it, jest} from "@jest/globals";
import {ShowPoints} from "../../../../../../src/Application/Service/Point/ShowPoints/ShowPoints";
import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
describe('ShowPoints', () => {
    it('should call showPoints method', () => {
        const showPoints = new ShowPoints(inMemoryRepositoryMock);
        const roomNumber: RoomNumber = {
            value: 1
        }
        showPoints.handle(roomNumber);
        expect(inMemoryRepositoryMock.showPoints).toHaveBeenCalledWith(roomNumber);
    });
});