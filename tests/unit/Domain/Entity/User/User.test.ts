import {UserMother} from "../../../../Utils/Stubs/Domain/Entity/User/UserMother";
import {UserIdMother} from "../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";

describe('User entity', () => {
    it('should get user id and name', () => {
        const userId = UserIdMother.create("1");
        const user = UserMother.create(
            "test",
            userId
        )
        expect(user.id.value).toBe("1");
        expect(user.name).toBe("test");
    });
});
