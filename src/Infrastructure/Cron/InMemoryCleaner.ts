import {InMemoryRepositoryInterface} from "../../Domain/Interface/InMemoryRepository/InMemoryRepositoryInterface";

export class InMemoryCleaner {
    constructor(
        private readonly inMemoryRepository: InMemoryRepositoryInterface
    ) {
    }

    public clean() {
        this.inMemoryRepository.clear();
    }
}
