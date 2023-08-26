import {ControllerInterface} from "../Interface/Controller/ControllerInterface";
import {Request} from "express";

export default class BaseController implements ControllerInterface {

    public getCookieFromRequest(req: Request, name: string): string {
        let cookie = req.headers.cookie;
        if (typeof cookie === "undefined") {
            return "";
        }
        let ca = cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length).split('=')[1];
            }
        }
        return "";
    }

    public init(): void {
    }
}
