export default class Tile {

    constructor(x, y, terrain) {

        this.x = x
        this.y = y

        this.terrain = terrain

        this.unit = null
        this.property = null

    }

    isOccupied() {
        return this.unit !== null
    }

    hasProperty() {
        return this.property !== null
    }

}