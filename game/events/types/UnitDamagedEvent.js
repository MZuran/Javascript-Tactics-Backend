import GameEvent from "../GameEvent.js"

export default class UnitDamagedEvent extends GameEvent {

    constructor(unit, source, amount) {

        super("unitDamaged")

        this.unitId = unit.id
        this.source = source
        this.amount = amount

    }

}

/*
GameEventLog.log(gameState,
    new UnitDamagedEvent(unit.id, "tank", 3)
)
*/