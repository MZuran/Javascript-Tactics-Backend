import GameState from "../GameState.js"
import CommandProcessor from "../commands/CommandProcessor.js"

export default class Match {

    constructor(gameState) {

        this.gameState = gameState
        this.commandHistory = []

    }

    executeCommand(command) {

        try {

            CommandProcessor.execute(this.gameState, command)

            // store for replay
            this.commandHistory.push(command)

        } catch (error) {

            console.error(`${command.name} Command Failed: ${error.message}`)
            //console.error(command)

        }

    }

}