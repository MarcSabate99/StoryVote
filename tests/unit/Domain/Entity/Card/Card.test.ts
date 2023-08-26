import {Card} from "../../../../../src/Domain/Entity/Card/Card";
import {CardMother} from "../../../../Utils/Stubs/Domain/Entity/Card/CardMother";

describe('Card entity test', () => {
    it('should get points and voter from the card', () => {
        const card: Card = CardMother.create(
          5,
          true
        );
        expect(card.points).toBe(5);
        expect(card.voter).toBe(true);
    });
});
