import UnitStats from "../stats/UnitStats.js"

export default class MovementSystem {

    static getMoveCost(unit, tile) {

        const movementType = UnitStats.get(unit, "movementType")
        const terrain = tile.terrain

        const cost = terrain.movementCost[movementType]

        if (cost === undefined) {
            return Infinity
        }

        return cost
    }

    static canEnterTile(unit, tile) {

        if (tile.unit && tile.unit.team !== unit.team) {
            return false
        }

        return true
    }

    static getReachableTiles(unit, map) {

        const startTile = unit.tile
        const movementPoints = UnitStats.get(unit, "movement")

        const visited = new Map()
        const queue = []

        queue.push({ tile: startTile, cost: 0 })
        visited.set(startTile, 0)

        const reachable = []

        while (queue.length > 0) {

            const current = queue.shift()

            const tile = current.tile
            const cost = current.cost

            if (!tile.unit || tile === startTile) {
                reachable.push(tile)
            }

            // Check if there are any statuses that prevent movement
            // if there are it only returns the tile the unit is already in
            for (const entry of unit.statusEffects.values()) {
                if (entry.effect.canMove && !entry.effect.canMove(unit)) {
                    return reachable
                }
            }

            const neighbors = map.getNeighbors(tile)

            for (const neighbor of neighbors) {

                if (!neighbor) continue

                const moveCost = this.getMoveCost(unit, neighbor)

                if (moveCost === Infinity) continue

                const newCost = cost + moveCost

                if (newCost > movementPoints) continue

                if (!this.canEnterTile(unit, neighbor)) continue

                const knownCost = visited.get(neighbor)

                if (knownCost !== undefined && knownCost <= newCost) continue

                visited.set(neighbor, newCost)

                queue.push({ tile: neighbor, cost: newCost })
            }
        }

        return reachable
    }

    static getTraversalCost(unit, tile) {

        const moveCost = this.getMoveCost(unit, tile)

        if (moveCost === Infinity) return Infinity

        if (!this.canEnterTile(unit, tile)) return Infinity

        return moveCost
    }

    static moveUnit(unit, destinationTile) {

        const startTile = unit.tile

        if (!startTile) return false
        if (destinationTile.unit) return false

        startTile.unit = null

        destinationTile.unit = unit
        unit.tile = destinationTile

        unit.hasMoved = true

        return true
    }

}