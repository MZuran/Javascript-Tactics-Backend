import Tile from "./Tile.js"
import TerrainTypes from "./TerrainTypes.js"

export default class Map {

    constructor(width, height) {

        this.width = width
        this.height = height

        this.tiles = []

        for (let y = 0; y < height; y++) {

            const row = []

            for (let x = 0; x < width; x++) {
                row.push(new Tile(x, y, TerrainTypes.PLAIN))
            }

            this.tiles.push(row)
        }

    }

    getNeighbors(tile) {
        const {x, y} = tile
        return [
            this.getTile(x + 1, y),
            this.getTile(x - 1, y),
            this.getTile(x, y + 1),
            this.getTile(x, y - 1)
        ].filter(t => t !== null)

    }

    getTile(x, y) {

        if (x < 0 || y < 0 || x >= this.width || y >= this.height) { return null }

        return this.tiles[y][x]

    }

    placeUnit(unit, x, y) {

        const tile = this.getTile(x, y)

        if (!tile) return false
        if (tile.unit) return false

        tile.unit = unit
        unit.tile = tile

        return true
    }

}