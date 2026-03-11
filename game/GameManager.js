import GameState from "./gameState"
import UnitFactory from "./units/UnitFactory"

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