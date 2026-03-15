import GameEvent from "../GameEvent.js"

export default class UnitMovedEvent extends GameEvent {

    constructor(unit, fromTile, toTile, path) {

        super("unitMoved")

        this.unitId = unit.id

        this.from = {
            x: fromTile.x,
            y: fromTile.y
        }

        this.to = {
            x: toTile.x,
            y: toTile.y
        }

        this.path = path

    }

}

/*
GameEventLog.log(gameState,
    new UnitMovedEvent(unit.id, startTile, endTile, path)
)
*/