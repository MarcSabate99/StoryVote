import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";
import {RandomWordMother} from "../../../Utils/RandomWordMother";

export class UserIdMother {
    public static create(userId: string): UserId {
        return {
           value: userId
        }
    }

    public static random(): UserId {
        return {
            value: new RandomWordMother().random(5)
        }
    }
}
