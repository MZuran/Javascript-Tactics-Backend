import GameEvent from "../GameEvent.js"

export default class PropertyDestroyedEvent extends GameEvent {

    constructor(id, tile) {

        super("propertyDestroyed")

        this.propertyId = id
        this.tile = tile

    }

}