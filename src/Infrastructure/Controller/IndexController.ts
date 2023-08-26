import BaseController from "./BaseController";
import {ControllerInterface} from "../Interface/Controller/ControllerInterface";
import {Express, Request, Response} from "express";

export class IndexController extends BaseController implements ControllerInterface {
    constructor(
        private readonly httpService: Express,
        private readonly rootPath: string
    ) {
        super();
    }

    public init(): void {
        this.httpService.get('/', (req: Request, res: Response) => {
            let userName = this.getCookieFromRequest(req, 'userName');
            if (userName !== "") {
                res.redirect('/home');
            } else {
                res.sendFile(this.rootPath + '/templates/index.html');
            }
        });
    }
}
