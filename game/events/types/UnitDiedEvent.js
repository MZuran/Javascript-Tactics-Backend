import GameEvent from "../GameEvent.js"

export default class UnitDiedEvent extends GameEvent {

    constructor(unit, killer) {

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