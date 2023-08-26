import {TotalValidVotes} from "../../../../../../src/Domain/ValueObject/Votes/TotalValidVotes";
import {RandomNumberMother} from "../../../Utils/RandomNumberMother";

export class TotalValidVotesMother {
    public create(votesValue: number): TotalValidVotes {
        return {
            value: votesValue
        }
    }

    public random(): TotalValidVotes {
        return {
            value: new RandomNumberMother().random(10, 1)
        }
    }
}
