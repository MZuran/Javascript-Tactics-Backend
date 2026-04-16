import GameCommand from "../GameCommand.js"

export default class AttackUnitCommand extends GameCommand {

    constructor(playerId, unitId, x, y) {

        super("Attack Unit")

        this.playerId = playerId
        this.unitId = unitId
        this.x = x
        this.y = y

    }

    execute(gameState) {

        gameState.attackUnit( this.unitId, this.x, this.y )

    }

}