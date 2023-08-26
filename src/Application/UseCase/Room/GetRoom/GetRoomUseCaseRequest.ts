import {RoomNumber} from "../../../../Domain/ValueObject/Room/RoomNumber";

export class GetRoomUseCaseRequest {
    constructor(
        public readonly roomNumber: RoomNumber
    ) {
    }
}
