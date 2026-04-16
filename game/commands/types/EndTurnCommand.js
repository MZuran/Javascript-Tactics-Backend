import GameCommand from "../GameCommand.js"

export default class EndTurnCommand extends GameCommand {

    constructor(playerId) {
        super("End Turn")

        this.playerId = playerId
    }

    execute(gameState) {
        gameState.nextTurn(this.playerId)
    }

}