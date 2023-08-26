import {RandomNumberMother} from "../../../Utils/RandomNumberMother";
import {TotalVotes} from "../../../../../../src/Domain/ValueObject/Votes/TotalVotes";

export class TotalVotesMother {
    public create(votesValue: number): TotalVotes {
        return {
            value: votesValue
        }
    }

    public random(): TotalVotes {
        return {
            value: new RandomNumberMother().random(10, 1)
        }
    }
}
