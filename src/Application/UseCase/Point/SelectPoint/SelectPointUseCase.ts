import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {SelectPointUseCaseRequest} from "./SelectPointUseCaseRequest";

export class SelectPointUseCase {

    constructor(
        private readonly repository: InMemoryRepositoryInterface
    ) {
    }

    public execute(selectPointUseCaseRequest: SelectPointUseCaseRequest): void {
        this.repository.selectPoint(
            selectPointUseCaseRequest.roomId,
            selectPointUseCaseRequest.userId,
            selectPointUseCaseRequest.points
        );
    }
}
