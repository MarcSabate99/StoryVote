import {UserId} from "../../ValueObject/User/UserId";
import {User} from "../User/User";
import {RoomNumber} from "../../ValueObject/Room/RoomNumber";
import {Card} from "../Card/Card";

export interface Room {
    creator: UserId;
    users: Record<string, User>;
    roomNumber: RoomNumber;
    cards: Record<string, Card>;
    showPoints: boolean
}
