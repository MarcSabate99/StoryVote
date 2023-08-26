import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RemoveUser} from "../../../../../../src/Application/Service/Room/RemoveUser/RemoveUser";
import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";

describe('RemoveUser', () => {
    it('should remove a user from a room', () => {
        const removeUser = new RemoveUser(inMemoryRepositoryMock);
        const roomNumber: RoomNumber = {
            value: 1
        };
        const userId: UserId = {
            value: "1"
        };

        removeUser.handle(roomNumber, userId);
        expect(inMemoryRepositoryMock.removeUserFromRoom).toHaveBeenCalledWith(roomNumber, userId);
    });
});
