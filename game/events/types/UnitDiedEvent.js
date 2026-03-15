import GameEvent from "../GameEvent"

export default class UnitDiedEvent extends GameEvent {

    constructor(unit) {

        super("unitDied")

        this.unitId = unit.id

        this.x = unit.tile.x
        this.y = unit.tile.y

    }

}

/*
GameEventLog.log(gameState,
    new UnitDiedEvent(unit.id, {x: 1, y: 2})
)
*/