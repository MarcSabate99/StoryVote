import {InMemoryRepositoryInterface} from "../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {UserCardNotFoundException} from "../Exception/User/UserCardNotFoundException";
import {UserId} from "../../Domain/ValueObject/User/UserId";
import {Room} from "../../Domain/Entity/Room/Room";
import {RoomNumber} from "../../Domain/ValueObject/Room/RoomNumber";
import {RoomNoExistsException} from "../Exception/Room/RoomNoExistsException";
import {User} from "../../Domain/Entity/User/User";
import {Point} from "../../Domain/ValueObject/Points/Point";
import {Card} from "../../Domain/Entity/Card/Card";

export class InMemoryRepository implements InMemoryRepositoryInterface {
    NO_ROOMS = 0;
    INITIAL_ROOM_NUMBER = 1;

    repository: {
        rooms: Room[]
    }
    rooms: Room[]

    constructor() {
        this.rooms = []
        this.repository = {
            rooms: this.rooms
        }
    }

    public joinRoom(user: User, roomNumber: RoomNumber) {

        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }

        this.repository.rooms[roomNumber.value].users[user.id.value] = user;
        const card: Card = {
            points: null,
            voter: true
        }

        this.repository.rooms[roomNumber.value].cards[user.id.value] = card;
    }

    public getPoints(roomNumber: RoomNumber): Point[] {
        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError();
        }
        const points: Point[] = [];
        const room = this.repository.rooms[roomNumber.value];
        for (const userId in room.cards) {
            let userCard: Card = room.cards[userId];
            if (typeof userCard !== "undefined") {
                const point: Point = {
                    value: userCard.points
                }
                points.push(
                    point
                );
            }

        }

        return points;
    }

    public selectPoint(roomNumber: RoomNumber, userId: UserId, points: Point) {
        if (typeof this.repository.rooms[roomNumber.value].cards[userId.value] !== "undefined" &&
            typeof this.repository.rooms[roomNumber.value].cards[userId.value].points !== "undefined") {
            this.repository.rooms[roomNumber.value].cards[userId.value].points = points.value
        }
    }

    public createRoom(userId: UserId): RoomNumber {
        if (Object.keys(this.repository.rooms).length === this.NO_ROOMS) {
            const number: RoomNumber = {
                value: this.INITIAL_ROOM_NUMBER
            }
            const emptyCard: Record<string, Card> = {};
            const emptyUser: Record<string, User> = {};

            const room: Room = {
                creator: userId,
                roomNumber: number,
                showPoints: false,
                cards: emptyCard,
                users: emptyUser
            }
            this.repository.rooms[number.value] = room

            return number;
        }
        let keys: number[] = Object.keys(this.repository.rooms).map(key => parseInt(key, 10));
        let maxId: number = Math.max(...keys);
        const number: RoomNumber = {
            value: maxId + 1
        }
        const emptyCard: Record<string, Card> = {};
        const emptyUser: Record<string, User> = {};

        const room: Room = {
            creator: userId,
            roomNumber: number,
            showPoints: false,
            cards: emptyCard,
            users: emptyUser
        }
        this.repository.rooms[number.value] = room;
        return number;
    }

    public resetPoints(roomNumber: RoomNumber) {
        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }

        for (const userId in this.repository.rooms[roomNumber.value].cards) {
            const userCard: Card = this.repository.rooms[roomNumber.value].cards[userId];
            userCard.points = '?';
        }

        this.hidePoints(roomNumber);
    }

    public getRoomCards(roomNumber: RoomNumber): Record<string, Card> {
        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }

        return this.repository.rooms[roomNumber.value].cards;
    }

    public showPoints(roomNumber: RoomNumber) {
        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }

        this.repository.rooms[roomNumber.value].showPoints = true;
    }

    public hidePoints(roomNumber: RoomNumber) {
        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }

        this.repository.rooms[roomNumber.value].showPoints = false;
    }

    public markUserAsVoter(roomNumber: RoomNumber, userId: UserId) {
        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }

        try {
            this.validateUserCard(roomNumber.value, userId.value);
            this.repository.rooms[roomNumber.value].cards[userId.value].voter = true;
        } catch (error) {
            throw error
        }
    }

    public markUserAsNonVoter(roomNumber: RoomNumber, userId: UserId) {
        if (typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }

        try {
            this.validateUserCard(roomNumber.value, userId.value);
            this.repository.rooms[roomNumber.value].cards[userId.value].voter = false;
        } catch (error) {
            throw error
        }
    }

    private validateUserCard(roomNumber: number, userId: string) {
        let cards = this.repository.rooms[roomNumber].cards;
        let userFound = false;
        let card = cards[userId];
        if (typeof card !== "undefined") {
            userFound = true;
        }

        if (!userFound) {
            throw new UserCardNotFoundException().toError();
        }
    }

    public getRoom(roomNumber: RoomNumber): Room|null {
        try {
            return this.repository.rooms[roomNumber.value];
        } catch (e) {
            return null;
        }
    }

    public removeUserFromRoom(roomNumber: RoomNumber, userId: UserId): void {
        if (this.isValidRoomsAndCards(roomNumber.value)) {
            delete this.repository.rooms[roomNumber.value].cards[userId.value]
        }
        if (this.isValidUsers(roomNumber.value)) {
            delete this.repository.rooms[roomNumber.value].users[userId.value]
        }
    }

    private isValidUsers(roomNumber: number) {
        return typeof this.repository.rooms !== "undefined" &&
            typeof this.repository.rooms[roomNumber] !== "undefined" &&
            typeof this.repository.rooms[roomNumber].users !== "undefined"
    }

    private isValidRoomsAndCards(roomNumber: number) {
        return typeof this.repository.rooms !== "undefined" &&
            typeof this.repository.rooms[roomNumber] !== "undefined" &&
            typeof this.repository.rooms[roomNumber].cards !== "undefined"
    }

    public changeCreator(user: User, roomNumber: RoomNumber): void {
        if(typeof this.repository.rooms[roomNumber.value] === "undefined") {
            throw new RoomNoExistsException().toError()
        }
        const creator = this.repository.rooms[roomNumber.value].creator;
        if(creator.value !== user.id.value) {
            this.repository.rooms[roomNumber.value].creator = user.id
            delete this.repository.rooms[roomNumber.value].cards[creator.value];
            const card:Card = {
                points: null,
                voter: true
            }
            this.repository.rooms[roomNumber.value].cards[user.id.value] = card
            if (this.isValidUsers(roomNumber.value)) {
                delete this.repository.rooms[roomNumber.value].users[creator.value];
                const userNew:User = {
                    name: user.name,
                    id: user.id
                }
                this.repository.rooms[roomNumber.value].users[user.id.value] = userNew
            }
        }
    }

    clear(): void {
        this.repository =  {
            rooms: []
        }
    }
}
