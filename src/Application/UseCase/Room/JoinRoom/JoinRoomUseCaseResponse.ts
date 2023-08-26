import {Room} from "../../../../Domain/Entity/Room/Room";

export class JoinRoomUseCaseResponse {
    constructor(
        public readonly room: Room|null
    ) {
    }
}
