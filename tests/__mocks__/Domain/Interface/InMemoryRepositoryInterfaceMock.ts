const inMemoryRepositoryMock = {
    joinRoom: jest.fn(),
    getPoints: jest.fn(),
    selectPoint: jest.fn(),
    createRoom: jest.fn(),
    resetPoints: jest.fn(),
    getRoomCards: jest.fn(),
    showPoints: jest.fn(),
    hidePoints: jest.fn(),
    markUserAsVoter: jest.fn(),
    markUserAsNonVoter: jest.fn(),
    getRoom: jest.fn(),
    removeUserFromRoom: jest.fn(),
    changeCreator: jest.fn(),
    clear: jest.fn(),
};

export default inMemoryRepositoryMock;
