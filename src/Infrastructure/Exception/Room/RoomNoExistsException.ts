import {Exception} from "../Exception";

export class RoomNoExistsException {
    private readonly message = "The room does not exists";
    private readonly code = 500;

    public toError(): Exception {
        return new Exception(
            this.message,
            this.code,
            this.constructor.name
        )
    }
}
