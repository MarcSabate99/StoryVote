import {Room} from "../../../../Domain/Entity/Room/Room";

export class GetRoomUseCaseResponse {
    constructor(
        public readonly room: Room|null
    ) {
    }
}
