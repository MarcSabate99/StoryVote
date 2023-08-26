export class RandomNumberMother {
    public random(max: number, min: number): number {
        return Math.random() * (max - min) + min;
    }
}
