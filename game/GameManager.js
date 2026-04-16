import GameState from "./GameState.js"
import UnitFactory from "./units/UnitFactory.js"

class GameManager {

    constructor() {
        this.state = new GameState()
        this.unitFactory = new UnitFactory()
    }

    startGame(map, players) {

        this.state.map = map
        this.state.players = players

    }

    endTurn() {
        this.state.nextTurn()
    }

}

module.exports = GameManager