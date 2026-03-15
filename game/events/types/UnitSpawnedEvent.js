import GameEvent from "../GameEvent.js"

export default class UnitSpawnedEvent extends GameEvent {

    constructor(unit, startingHp = null) {

        super("UnitSpawned")

        this.unitId = unit.id
        this.owner = unit.owner
        this.type = unit.type.name
        this.hp = unit.hp

        this.coordinates.x = unit.tile.x
        this.coordinates.y = unit.tile.y

    }

}

/*
GameEventLog.log(gameState,
    new UnitSpawnedEvent(unit)
)
*/