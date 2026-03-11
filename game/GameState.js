export default class GameState {

    constructor() {

        // map instance
        this.map = null

        // players in the match
        this.players = []

        // all units currently alive
        // dictionary keyed by unit id
        this.units = new Map()

        // properties like cities/factories
        this.properties = []

        // whose turn it is
        this.currentPlayerIndex = 0

        // individual player turns
        this.turnNumber = 0

    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex]
    }

    getDay() {
        return Math.floor(this.turnNumber / this.players.length) + 1
    }

    nextTurn() {

        this.turnNumber++

        this.currentPlayerIndex++

        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0
        }

    }

    addUnit(unit) {
        this.units.set(unit.id, unit)
    }

    removeUnit(unit) {
        this.units.delete(unit.id)
    }

    printTerrain() {

        for (let y = 0; y < this.map.height; y++) {

            let row = ""

            for (let x = 0; x < this.map.width; x++) {

                const tile = this.map.getTile(x, y)

                const name = tile.terrain.name
                const code = name.slice(0, 2).toUpperCase()

                row += code + " "

            }

            console.log(row)

        }

    }

    printUnits() {

        for (let y = 0; y < this.map.height; y++) {

            let row = ""

            for (let x = 0; x < this.map.width; x++) {

                const tile = this.map.getTile(x, y)

                if (tile.unit) {

                    const name = tile.unit.type.name
                    const code = name.slice(0, 2).toUpperCase()

                    row += code + " "

                } else {

                    row += ".. "

                }

            }

            console.log(row)

        }

    }

}