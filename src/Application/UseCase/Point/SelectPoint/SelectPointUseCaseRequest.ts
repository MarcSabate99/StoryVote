import {UserId} from "../../../../Domain/ValueObject/User/UserId";
import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";
import {Point} from "../../../../Domain/ValueObject/Points/Point";

export class SelectPointUseCaseRequest {

    constructor(
        public readonly roomId: RoomNumber,
        public readonly points: Point,
        public readonly userId: UserId
    ) {
    }
}
