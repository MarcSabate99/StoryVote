import {RoomNoExistsException} from "../../../../../src/Infrastructure/Exception/Room/RoomNoExistsException";
import {Exception} from "../../../../../src/Infrastructure/Exception/Exception";

describe('RoomException', () => {
    it('should create an Exception instance with correct properties', () => {
        const message = 'The room does not exists';
        const errorCode = 500;
        const type = 'RoomNoExistsException';

        const roomNoExistsException = new RoomNoExistsException();
        const error = roomNoExistsException.toError();

        expect(roomNoExistsException).toBeDefined();
        expect(error.message).toBe(message);
        expect(error.errorCode).toBe(errorCode);
        expect(error.type).toBe(type);
        expect(error).toBeInstanceOf(Exception)
    });
});
