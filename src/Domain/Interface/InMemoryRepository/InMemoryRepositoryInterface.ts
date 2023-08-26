import {Card} from "../../Entity/Card/Card";
import {UserId} from "../../ValueObject/User/UserId";
import {RoomNumber} from "../../ValueObject/Room/RoomNumber";
import {Room} from "../../Entity/Room/Room";
import {User} from "../../Entity/User/User";
import {Point} from "../../ValueObject/Points/Point";

export interface InMemoryRepositoryInterface {
    joinRoom(user: User, roomNumber: RoomNumber): void;

    getPoints(roomNumber: RoomNumber): Point[];

    selectPoint(roomNumber: RoomNumber, userId: UserId, points: Point): void;

    createRoom(userId: UserId): RoomNumber;

    resetPoints(roomNumber: RoomNumber): void;

    getRoomCards(roomNumber: RoomNumber): Record<string, Card>;

    showPoints(roomNumber: RoomNumber): void;

    hidePoints(roomNumber: RoomNumber): void;

    markUserAsVoter(roomNumber: RoomNumber, userId: UserId): void;

    markUserAsNonVoter(roomNumber: RoomNumber, userId: UserId): void;

    getRoom(roomNumber: RoomNumber): Room|null;

    removeUserFromRoom(roomNumber: RoomNumber, userId: UserId): void;

    changeCreator(userId: User, roomNumber: RoomNumber): void;

    clear(): void;
}

