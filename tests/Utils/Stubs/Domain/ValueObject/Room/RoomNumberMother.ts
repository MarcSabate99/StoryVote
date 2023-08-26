import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {RandomNumberMother} from "../../../Utils/RandomNumberMother";

export class RoomNumberMother {

    public static create(number: number): RoomNumber {
        return {
            value: number
        }
    }

    public static random(): RoomNumber {
        return {
            value: new RandomNumberMother().random(10, 1)
        }
    }
}
