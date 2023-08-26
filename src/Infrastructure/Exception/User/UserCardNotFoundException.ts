import {Exception} from "../Exception";

export class UserCardNotFoundException {
    private readonly message = "User card not found";
    private readonly code = 500;

    public toError(): Exception {
        return new Exception(
            this.message,
            this.code,
            this.constructor.name
        )
    }
}
