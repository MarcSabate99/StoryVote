import {describe, expect, it} from "@jest/globals";
import {ChangeCreator} from "../../../../../../src/Application/Service/Room/Creator/ChangeCreator";
import InMemoryRepositoryInterfaceMock from "../../../../../__mocks__/Domain/Interface/InMemoryRepositoryInterfaceMock";
import {UserIdMother} from "../../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";
import {UserMother} from "../../../../../Utils/Stubs/Domain/Entity/User/UserMother";
import {RoomNumberMother} from "../../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";

describe('ChangeCreator', () => {
    it('handle changes the creator successfully', () => {
        const changeCreator = new ChangeCreator(InMemoryRepositoryInterfaceMock);
        const userId = UserIdMother.create("1");
        const user = UserMother.create("test", userId);
        const roomNumber = RoomNumberMother.create(1);
        changeCreator.handle(user, roomNumber);
        expect(InMemoryRepositoryInterfaceMock.changeCreator).toHaveBeenCalledWith(user, roomNumber);
    });
});
