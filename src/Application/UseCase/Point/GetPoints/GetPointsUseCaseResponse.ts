import {Point} from "../../../../Domain/ValueObject/Points/Point";

export class GetPointsUseCaseResponse {
    constructor(
        public readonly points: Point[]
    ) {
    }
}
