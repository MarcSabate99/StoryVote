import {UserId} from "../../../../Domain/ValueObject/User/UserId";

export class CreateRoomUseCaseRequest {

    constructor(
        public readonly userId: UserId
    ) {
    }
}
