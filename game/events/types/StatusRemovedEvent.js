import GameEvent from "../GameEvent.js"

export default class StatusRemovedEvent extends GameEvent {

    constructor(unit, status) {

        super("statusRemoved")

        this.unitId = unit.id
        this.status = status.id

    }

}