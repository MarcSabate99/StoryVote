import {Card} from "../../../../../src/Domain/Entity/Card/Card";
import {RoomMother} from "../../../../Utils/Stubs/Domain/Entity/Room/RoomMother";
import {RoomNumberMother} from "../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {UserIdMother} from "../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";
import {User} from "../../../../../src/Domain/Entity/User/User";

describe('Room entity test', () => {
    it('should get room data', () => {
        const roomNumber = RoomNumberMother.create(1);
        const userId = UserIdMother.create("1");
        const emptyCard: Record<string, Card> = {};
        const emptyUser: Record<string, User> = {};
        const room = RoomMother.create(
            userId,
            emptyUser,
            roomNumber,
            emptyCard,
            false
        )
        expect(room.cards).toBe(emptyCard);
        expect(room.creator.value).toBe(userId.value);
        expect(room.roomNumber.value).toBe(1);
        expect(room.showPoints).toBe(false);
    });
});
