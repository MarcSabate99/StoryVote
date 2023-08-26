import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {ResetPointsUseCaseRequest} from "./ResetPointsUseCaseRequest";

export class ResetPointsUseCase {
    constructor(
        private readonly repository: InMemoryRepositoryInterface
    ) {
    }

    public execute(resetPointsUseCaseRequest: ResetPointsUseCaseRequest): void {
        this.repository.resetPoints(
            resetPointsUseCaseRequest.roomId
        );
    }
}
