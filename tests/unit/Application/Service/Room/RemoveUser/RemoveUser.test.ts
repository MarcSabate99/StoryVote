import inMemoryRepositoryMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {RemoveUser} from "../../../../../../src/Application/Service/Room/RemoveUser/RemoveUser";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";

describe('RemoveUser', () => {
    it('should remove a user from a room', () => {
        const removeUser = new RemoveUser(inMemoryRepositoryMock);
        const roomNumber = RoomNumberMother.create(1);
        const userId = UserIdMother.create("1");
        removeUser.handle(roomNumber, userId);
        expect(inMemoryRepositoryMock.removeUserFromRoom).toHaveBeenCalledWith(roomNumber, userId);
    });
});
