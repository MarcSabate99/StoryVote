import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class GetPointsUseCaseRequest {
    constructor(
        public readonly roomId: RoomNumber
    ) {
    }
}
