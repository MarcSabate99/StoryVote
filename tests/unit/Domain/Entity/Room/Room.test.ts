import {Card} from "../../../../../src/Domain/Entity/Card/Card";
import {Room} from "../../../../../src/Domain/Entity/Room/Room";
import {RoomMother} from "../../../../Utils/Stubs/Domain/Entity/Room/RoomMother";
import {RoomNumberMother} from "../../../../Utils/Stubs/Domain/ValueObject/Room/RoomNumberMother";
import {RoomNumber} from "../../../../../src/Domain/ValueObject/Room/RoomNumber";
import {UserId} from "../../../../../src/Domain/ValueObject/User/UserId";
import {UserIdMother} from "../../../../Utils/Stubs/Domain/ValueObject/User/UserIdMother";
import {User} from "../../../../../src/Domain/Entity/User/User";

describe('Room entity test', () => {
    it('should get room data', () => {
        const roomNumber: RoomNumber = RoomNumberMother.create(1);
        const userId: UserId = UserIdMother.create("1");
        const emptyCard: Record<string, Card> = {};
        const emptyUser: Record<string, User> = {};
        const room: Room = RoomMother.create(
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
