import {MarkAsVoter} from "../../../../../../src/Application/Service/Vote/MarkAsVoter/MarkAsVoter";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";

describe('MarkAsVoter', () => {
    it('should mark user as voter', () => {
        const markAsVoter = new MarkAsVoter(inMemoryRepositoryMock);
        const roomNumber:RoomNumber = {
            value: 1
        }
        const userId:UserId = {
            value: "1"
        }
        markAsVoter.handle(roomNumber, userId);
        expect(inMemoryRepositoryMock.markUserAsVoter).toHaveBeenCalledWith(roomNumber, userId);
        expect(inMemoryRepositoryMock.markUserAsVoter).toHaveBeenCalledTimes(1);
    });
});
