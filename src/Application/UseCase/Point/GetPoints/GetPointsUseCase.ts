import {InMemoryRepositoryInterface} from "../../../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";
import {GetPointsUseCaseResponse} from "./GetPointsUseCaseResponse";
import {GetPointsUseCaseRequest} from "./GetPointsUseCaseRequest";

export class GetPointsUseCase {

    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public execute(getPointsUseCaseRequest: GetPointsUseCaseRequest): GetPointsUseCaseResponse {
        const points = this.inMemoryRepository.getPoints(getPointsUseCaseRequest.roomId);
        return new GetPointsUseCaseResponse(points);
    }
}
