export class Exception {
    constructor(
        public readonly message: string,
        public readonly errorCode: number,
        public readonly type: string
    ) {
    }
}
