import {RandomNumberMother} from "../../../Utils/RandomNumberMother";
import {Point} from "../../../../../../src/Domain/ValueObject/Points/Point";

export class PointMother {
    public static create(pointValue: number | string | null): Point {
        return {
            value: pointValue
        }
    }

    public static random(): Point {
        return {
            value: new RandomNumberMother().random(10, 1)
        }
    }
}
