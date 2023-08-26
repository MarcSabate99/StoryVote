import {GetVotes} from "../../../../../../src/Application/Service/Room/Votes/GetVotes";

describe('GetVotes', () => {
    let getVotes: GetVotes;
    beforeEach(() => {
        getVotes = new GetVotes();
    })

    it('should count total votes and total valid votes', () => {
        const cards = {
            "1": { points: 5, voter: true },
            "2": { points: 3, voter: true },
            "3": { points: '?', voter: true },
            "4": { points: null, voter: false },
        };
        const [totalVotes, totalValidVotes] = getVotes.handle(cards);
        expect(totalVotes.value).toBe(3);
        expect(totalValidVotes.value).toBe(2);
    });

    it('should handle empty cards', () => {
        const cards = {};
        const [totalVotes, totalValidVotes] = getVotes.handle(cards);
        expect(totalVotes.value).toBe(0);
        expect(totalValidVotes.value).toBe(0);
    });

    it('should handle cards with all invalid points', () => {
        const cards = {
            "1": { points: '?', voter: true },
            "2": { points: null, voter: true },
            "3": { points: '?', voter: true },
        };
        const [totalVotes, totalValidVotes] = getVotes.handle(cards);
        expect(totalVotes.value).toBe(3);
        expect(totalValidVotes.value).toBe(0);
    });
});
