import GameEvent from "../GameEvent.js"

export default class StatusAppliedEvent extends GameEvent {

    constructor(unit, status, duration) {

        super("statusApplied")

        this.unitId = unit.id
        this.status = status.id
        this.duration = duration

    }

}