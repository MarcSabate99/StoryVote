import {User} from "../../../../../src/Domain/Entity/User/User";
import {UserMother} from "../../../../Utils/Stubs/Domain/Entity/User/UserMother";
import {UserId} from "../../../../../src/Domain/ValueObject/User/UserId";
import {UserIdMother} from "../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";

describe('User entity', () => {
    it('should get user id and name', () => {
        const userId: UserId = UserIdMother.create("1");
        const user: User = UserMother.create(
            "test",
            userId
        )
        expect(user.id.value).toBe("1");
        expect(user.name).toBe("test");
    });
});
