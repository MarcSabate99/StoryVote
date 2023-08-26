import {Exception} from "../../../../src/Infrastructure/Exception/Exception";

describe('Exception Unit Test', () => {
    it('should create an Exception instance with correct properties', () => {
        const message = 'This is an exception';
        const errorCode = 404;
        const type = 'NotFoundError';

        const exception = new Exception(
            message,
            errorCode,
            type
        );

        expect(exception).toBeDefined();
        expect(exception.message).toBe(message);
        expect(exception.errorCode).toBe(errorCode);
        expect(exception.type).toBe(type);
    });
});
