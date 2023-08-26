import InMemoryRepositoryInterfaceMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {MarkAsNonVoter} from "../../../../../../src/Application/Service/Vote/MarkAsNonVoter/MarkAsNonVoter";
import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";

describe('MarkAsNonVoter', () => {
    it('should mark user as non-voter', () => {
        const markAsNonVoter = new MarkAsNonVoter(InMemoryRepositoryInterfaceMock);
        const roomNumber: RoomNumber = {
            value: 1
        }
        const userId: UserId = {
            value: "1"
        }
        markAsNonVoter.handle(roomNumber, userId);
        expect(InMemoryRepositoryInterfaceMock.markUserAsNonVoter).toHaveBeenCalledWith(roomNumber, userId);
        expect(InMemoryRepositoryInterfaceMock.markUserAsNonVoter).toHaveBeenCalledTimes(1);
    });
});
