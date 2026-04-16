import GameEvent from "../GameEvent.js"

export default class PropertyAttackedEvent extends GameEvent {

    constructor(id, category, power) {

        super("propertyAttacked")

        this.propertyId = id
        this.category = category
        this.power = power

    }

}