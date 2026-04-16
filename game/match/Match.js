import GameState from "../GameState.js"
import CommandProcessor from "../commands/CommandProcessor.js"

export default class Match {

    constructor(gameState) {

        this.gameState = gameState
        this.commandHistory = []

    }

    executeCommand(command) {

        CommandProcessor.execute(this.gameState, command)

        // store for replay
        this.commandHistory.push(command)
    }

}