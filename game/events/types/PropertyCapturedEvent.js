import GameEvent from "../GameEvent.js"

export default class PropertyCapturedEvent extends GameEvent {

    constructor(id, newOwner) {

        super("propertyCaptured")

        this.propertyId = id
        this.owner = newOwner

    }

}