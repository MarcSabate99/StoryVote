import {RoomNoExistsException} from "../../../../../src/Infrastructure/Exception/Room/RoomNoExistsException";
import {Exception} from "../../../../../src/Infrastructure/Exception/Exception";
import {UserCardNotFoundException} from "../../../../../src/Infrastructure/Exception/User/UserCardNotFoundException";

describe('Use Card not found Exception', () => {
    it('should create an Exception instance with correct properties', () => {
        const message = 'User card not found';
        const errorCode = 500;
        const type = 'UserCardNotFoundException';

        const userCardNotFoundException = new UserCardNotFoundException();
        const error = userCardNotFoundException.toError();

        expect(userCardNotFoundException).toBeDefined();
        expect(error.message).toBe(message);
        expect(error.errorCode).toBe(errorCode);
        expect(error.type).toBe(type);
        expect(error).toBeInstanceOf(Exception)
    });
});
