import InMemoryRepositoryInterfaceMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {MarkAsNonVoter} from "../../../../../../src/Application/Service/Vote/MarkAsNonVoter/MarkAsNonVoter";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";

describe('MarkAsNonVoter', () => {
    it('should mark user as non-voter', () => {
        const markAsNonVoter = new MarkAsNonVoter(InMemoryRepositoryInterfaceMock);
        const roomNumber = RoomNumberMother.create(1);
        const userId = UserIdMother.create("1");
        markAsNonVoter.handle(roomNumber, userId);
        expect(InMemoryRepositoryInterfaceMock.markUserAsNonVoter).toHaveBeenCalledWith(roomNumber, userId);
        expect(InMemoryRepositoryInterfaceMock.markUserAsNonVoter).toHaveBeenCalledTimes(1);
    });
});
