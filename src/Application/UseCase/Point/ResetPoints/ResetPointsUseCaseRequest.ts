import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class ResetPointsUseCaseRequest {
    constructor(
        public readonly roomId: RoomNumber
    ) {
    }
}
