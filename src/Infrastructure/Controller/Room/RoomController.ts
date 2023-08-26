import BaseController from "../BaseController";
import {GetRoomUseCase} from "../../../Application/UseCase/Room/GetRoom/GetRoomUseCase";
import {InMemoryRepositoryInterface} from "../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {ControllerInterface} from "../../Interface/Controller/ControllerInterface";
import {Express, Request, Response} from "express";
import {GetRoomUseCaseRequest} from "../../../Application/UseCase/Room/GetRoom/GetRoomUseCaseRequest";
import {RoomNumber} from "../../../Domain/ValueObject/Room/RoomNumber";

export class RoomController extends BaseController implements ControllerInterface {

    constructor(
        private readonly httpService: Express,
        private readonly rootPath: string,
        private readonly repository: InMemoryRepositoryInterface
    ) {
        super();
    }

    public init(): void {
        this.httpService.get('/room/:roomNumber', (req: Request, res: Response) => {
            const room: RoomNumber = {
                value: parseInt(req.params.roomNumber, 10)
            }
            const getRoomUseCaseRequest = new GetRoomUseCaseRequest(room);
            const getRoomUseCase = new GetRoomUseCase(this.repository);
            try {
                const response = getRoomUseCase.execute(getRoomUseCaseRequest);
                if (response.room !== null && typeof response.room !== "undefined") {
                    res.sendFile(this.rootPath + '/templates/room.html');
                } else {
                    res.redirect('/home?room=not_found');
                }
            } catch (e) {
                res.redirect('/home?room=not_found');
            }
        });

        this.httpService.get('/room', (req: Request, res: Response) => {
            res.redirect('/home?room=not_found');
        });
    }
}
