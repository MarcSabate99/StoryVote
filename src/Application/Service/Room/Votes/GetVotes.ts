import {Card} from "../../../../Domain/Entity/Card/Card";
import {TotalVotes} from "../../../../Domain/ValueObject/Votes/TotalVotes";
import {TotalValidVotes} from "../../../../Domain/ValueObject/Votes/TotalValidVotes";

export class GetVotes {

    public handle(
        cards: Record<string, Card>
    ): [TotalVotes, TotalValidVotes] {
        let totalVotes: TotalVotes = {
            value: 0
        };
        let totalValidVotes: TotalValidVotes = {
            value: 0
        };
        for (const cardId in cards) {
            const card = cards[cardId];
            if (card.points !== null && card.points !== '?') {
                totalValidVotes.value++;
            }

            if (card.voter) {
                totalVotes.value++;
            }
        }

        return [totalVotes, totalValidVotes];
    }
}
