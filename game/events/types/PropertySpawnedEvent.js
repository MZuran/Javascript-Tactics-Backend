/* property.id, property.constructor.id, tile.x, tile.y, property.owner */

import GameEvent from "../GameEvent.js"

export default class PropertySpawnedEvent extends GameEvent {

    constructor(propertyId, propertyConstructorId, x, y, owner) {

        super("propertySpawned")

        this.propertyId = propertyId
        this.propertyConstructorId = propertyConstructorId
        this.owner = owner
        this.tile = { x, y }

    }

}