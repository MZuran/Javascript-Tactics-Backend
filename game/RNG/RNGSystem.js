export default class RNG {

    static MOD = 2147483647
    static MULT = 16807
    static INV_MULT = 1407677000

    constructor(seed = Date.now()) {
        this.seed = seed % RNG.MOD
        if (this.seed <= 0) this.seed += RNG.MOD - 1
    }

    // get the next random number
    next() {
        this.seed = (this.seed * RNG.MULT) % RNG.MOD
        return this.seed / RNG.MOD
    }

    // get the previous random number
    previous() {
        this.seed = (this.seed * RNG.INV_MULT) % RNG.MOD
        return this.seed / RNG.MOD
    }

    // nextInt(6) + 1 for a D6
    nextInt(max) {
        return Math.floor(this.next() * max)
    }

    // chance(0.3) for 30% success rate
    chance(probability) {
        return this.next() < probability
    }

}