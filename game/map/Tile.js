export default class Tile {

    constructor(x, y, terrain) {

        this.x = x
        this.y = y

        this.terrain = terrain

        // if a unit stands here
        this.unit = null

        // for cities/factories later
        this.property = null

    }

    isOccupied() {
        return this.unit !== null
    }

}