// game/properties/PropertySystem.js
import GameEventLog from "../events/GameEventLog.js"
import { PropertyAttackedEvent, PropertyDestroyedEvent, PropertyCapturedEvent, PropertySpawnedEvent } from "../events/index.js"

export default class PropertySystem {

    // movement system should call this when a unit enters target tile
    static onUnitEntry(gameState, unit, tile) {
        const property = tile.property
        if (!property) return
        property.onUnitEntry?.(gameState, unit)
    }

    // capture attempt: uses unit.getCapturePower(property)
    static captureProperty(gameState, unit, property) {
        if (!property) return false
        if (!property.canBeCaptured) return false

        // unit must be on the property's tile
        if (!unit.tile || unit.tile !== property.tile) return false

        const power = unit.getCapturePower?.(property) ?? 0
        if (power <= 0) return false

        property.hp -= power

        // log partial capture
        GameEventLog.log(gameState, new PropertyAttackedEvent(property.id, unit.type.category, power))

        // capture completed
        if (property.hp <= 0) {

            // transfer ownership
            property.owner = unit.owner
            property.hp = property.maxHP

            property.onCapture?.(gameState, unit)

            GameEventLog.log(gameState, new PropertyCapturedEvent(property.id, property.owner))
        }

        return true
    }

    // property is attacked by unit: uses unit.getPropertyAttackPower(property)
    static attackProperty(gameState, unit, property) {
        if (!property) return false
        if (!property.canBeAttacked) return false

        const power = unit.getPropertyAttackPower?.(property) ?? 0
        if (power <= 0) return false

        property.hp -= power

        GameEventLog.log(gameState, new PropertyAttackedEvent(property.id, unit.type.category, power))

        if (property.hp <= 0) {
            this.removeProperty(gameState, property, unit)
        }

        return true
    }

    // remove property from map completely (destroyed)
    static removeProperty(gameState, property, destroyingUnit = null) {
        // call hook
        property.onDeath?.(gameState, destroyingUnit)

        // remove reference from tile
        if (property.tile) {
            property.tile.property = null
        }

        // remove from gameState.properties (array)
        const idx = gameState.properties.indexOf(property)
        if (idx !== -1) gameState.properties.splice(idx, 1)

        GameEventLog.log(gameState, new PropertyDestroyedEvent(property.id, property.tile))

        return true
    }

    // used when loading/creating a property on a tile (spawn)
    static placeProperty(gameState, property, tile) {
        property.tile = tile
        tile.property = property
        gameState.properties.push(property)
        GameEventLog.log(gameState, new PropertySpawnedEvent(property.id, property.constructor.id, tile.x, tile.y, property.owner))
    }
}