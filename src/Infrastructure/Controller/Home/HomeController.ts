import BaseController from "../BaseController";
import {ControllerInterface} from "../../Interface/Controller/ControllerInterface";
import {Express, Request, Response} from "express";

export class HomeController extends BaseController implements ControllerInterface {

    constructor(
        private readonly httpService: Express,
        private readonly rootPath: string
    ) {
        super();
    }

    public init(): void {
        this.httpService.post('/home', (req: Request, res: Response) => {
            res.sendFile(this.rootPath + '/templates/home.html');
        });

        this.httpService.get('/home', (req: Request, res: Response) => {
            res.sendFile(this.rootPath + '/templates/home.html');
        });
    }
}

