import {HomeController} from './Infrastructure/Controller/Home/HomeController';
import {IndexController} from './Infrastructure/Controller/IndexController';
import {RoomController} from './Infrastructure/Controller/Room/RoomController';
import {InMemoryRepository} from './Infrastructure/Repository/InMemoryRepository';
import BaseController from "./Infrastructure/Controller/BaseController";
import {Express} from "express";
import {InMemoryRepositoryInterface} from "./Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {schedule} from "node-cron";
import {InMemoryCleaner} from "./Infrastructure/Cron/InMemoryCleaner";
export class Kernel {
    private routes: BaseController[];
    private readonly inMemoryRepository: InMemoryRepositoryInterface;
    constructor(
        private readonly httpService: Express,
        private readonly rootPath: string,
    ) {
        this.inMemoryRepository = new InMemoryRepository();
        this.routes = [
            new HomeController(this.httpService, rootPath),
            new IndexController(this.httpService, rootPath),
            new RoomController(this.httpService, rootPath, this.inMemoryRepository)
        ];
    }

    public getRepository(): InMemoryRepositoryInterface {
        return this.inMemoryRepository;
    }

    public init(): void {
        this.routes.map(r => r.init());
        schedule('* * */24 * *', () => {
            const memoryCleaner = new InMemoryCleaner(this.inMemoryRepository);
            memoryCleaner.clean()
        });
    }
}
