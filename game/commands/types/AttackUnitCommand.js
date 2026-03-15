import GameCommand from "../GameCommand.js"

export default class AttackUnitCommand extends GameCommand {

    constructor(unitId, x, y) {

        super()

        this.unitId = unitId
        this.x = x
        this.y = y

    }

    execute(gameState) {

        gameState.attackUnit(
            this.unitId,
            this.x,
            this.y
        )

    }

}