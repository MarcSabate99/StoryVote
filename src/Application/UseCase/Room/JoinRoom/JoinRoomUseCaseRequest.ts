import {User} from "../../../../Domain/Entity/User/User";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class JoinRoomUseCaseRequest {

    constructor(
        public readonly roomId: RoomNumber,
        public readonly user: User
    ) {
    }
}
