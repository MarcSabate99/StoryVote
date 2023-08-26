import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";
import {User} from "../../../../../../src/Domain/Entity/User/User";

export class UserMother {
    public static create(
        name: string,
        id: UserId
    ): User {
        return {
            name: name,
            id: id
        }
    }
}
