import {RandomNumberMother} from "../../../Utils/RandomNumberMother";
import {Card} from "../../../../../../src/Domain/Entity/Card/Card";

export class CardMother {
    public static create(
        points: number | string | null,
        voter: boolean
    ): Card {
        return {
            points: points,
            voter: voter
        }
    }

    public static randomWithVoter(): Card {
        return {
            points: new RandomNumberMother().random(10, 5),
            voter: true
        }
    }

    public static randomWithoutVoter(): Card {
        return {
            points: new RandomNumberMother().random(10, 5),
            voter: false
        }
    }
}
