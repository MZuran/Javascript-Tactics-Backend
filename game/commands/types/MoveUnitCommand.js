import GameCommand from "../GameCommand.js"

export default class MoveUnitCommand extends GameCommand {

    constructor(playerId, unitId, x, y) {
        super("Move Unit")

        this.playerId = playerId
        this.unitId = unitId
        this.x = x
        this.y = y
    }

    execute(gameState) {
        gameState.moveUnit(this.unitId, this.x, this.y)
    }
    
}