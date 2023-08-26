import {Card} from "../../../../../../src/Domain/Entity/Card/Card";
import {Room} from "../../../../../../src/Domain/Entity/Room/Room";
import {UserId} from "../../../../../../src/Domain/ValueObject/User/UserId";
import {User} from "../../../../../../src/Domain/Entity/User/User";
import {RoomNumber} from "../../../../../../src/Domain/ValueObject/Room/RoomNumber";

export class RoomMother {
    public static create(
        creator: UserId,
        users: Record<string, User>,
        roomNumber: RoomNumber,
        cards: Record<string, Card>,
        showPoints: boolean,
    ): Room {
        return {
            creator: creator,
            cards: cards,
            users: users,
            roomNumber: roomNumber,
            showPoints: showPoints
        }
    }
}
