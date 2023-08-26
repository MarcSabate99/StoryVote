import {beforeEach, describe, expect, it, jest} from "@jest/globals";
import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {ChangeCreator} from "../../../../../../src/Application/Service/Room/Creator/ChangeCreator";
import {User} from "../../../../../../src/Domain/Entity/User/User";
import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";
import InMemoryRepositoryInterfaceMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";

describe('ChangeCreator', () => {
    it('handle changes the creator successfully', () => {
        const changeCreator = new ChangeCreator(InMemoryRepositoryInterfaceMock);
        const userId:UserId = {
            value: "1"
        }
        const user: User = {
            name: "test",
            id: userId
        };
        const roomNumber: RoomNumber = {
            value: 1
        };
        changeCreator.handle(user, roomNumber);
        expect(InMemoryRepositoryInterfaceMock.changeCreator).toHaveBeenCalledWith(user, roomNumber);
    });
});
