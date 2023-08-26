import {EventInterface} from "../../Interface/Event/EventInterface";
import {Server, Socket} from "socket.io";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {UserId} from "../../../Domain/ValueObject/User/UserId";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";
import {MarkAsVoter} from "../../../Application/Service/Vote/MarkAsVoter/MarkAsVoter";
import {MarkAsNonVoter} from "../../../Application/Service/Vote/MarkAsNonVoter/MarkAsNonVoter";
import {GetRefreshedRoom} from "../../../Application/Service/Room/Refresh/GetRefreshedRoom";

export default class VoterEvent implements EventInterface {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    listen(socket: Socket, io: Server) {
        socket.on('im voter', (voter: boolean, roomNumber: number, id: string) => {
            const number: RoomNumber = {
                value: roomNumber
            }
            const userId:UserId = {
                value: id
            }
            if (voter) {
                const markAsVoter = new MarkAsVoter(this.inMemoryRepository);
                markAsVoter.handle(number, userId);
            } else {
                const markAsNonVoter = new MarkAsNonVoter(this.inMemoryRepository);
                markAsNonVoter.handle(number, userId);
            }

            const refresher = new GetRefreshedRoom(this.inMemoryRepository);
            const refreshedData = refresher.handle(number);

            socket.join(number.value.toString());
            io.to(number.value.toString()).emit("refresh room", refreshedData.cards, refreshedData.votes);
        });
    }
}
