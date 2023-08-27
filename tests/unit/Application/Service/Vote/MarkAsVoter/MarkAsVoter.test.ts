import {MarkAsVoter} from "../../../../../../src/Application/Service/Vote/MarkAsVoter/MarkAsVoter";
import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";

describe('MarkAsVoter', () => {
    it('should mark user as voter', () => {
        const markAsVoter = new MarkAsVoter(inMemoryRepositoryMock);
        const roomNumber = RoomNumberMother.create(1);
        const userId = UserIdMother.create("1");
        markAsVoter.handle(roomNumber, userId);
        expect(inMemoryRepositoryMock.markUserAsVoter).toHaveBeenCalledWith(roomNumber, userId);
        expect(inMemoryRepositoryMock.markUserAsVoter).toHaveBeenCalledTimes(1);
    });
});
