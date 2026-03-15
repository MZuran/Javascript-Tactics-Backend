import GameCommand from "../GameCommand.js"

export default class MoveUnitCommand extends GameCommand {

    constructor(unitId, x, y) {
        super()

        this.unitId = unitId
        this.x = x
        this.y = y
    }

    execute(gameState) {

        gameState.moveUnit(
            this.unitId,
            this.x,
            this.y
        )

    }

}