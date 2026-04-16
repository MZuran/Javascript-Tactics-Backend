import MovementSystem from "./MovementSystem.js"

export default class AStar {

    static heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }

    static findPath(unit, map, startTile, goalTile) {

        const openSet = new Set([startTile])

        const cameFrom = new Map()

        const gScore = new Map()
        gScore.set(startTile, 0)

        const fScore = new Map()
        fScore.set(startTile, this.heuristic(startTile, goalTile))

        while (openSet.size > 0) {

            let current = null
            let bestScore = Infinity

            for (const tile of openSet) {

                const score = fScore.get(tile) ?? Infinity

                if (score < bestScore) {
                    bestScore = score
                    current = tile
                }

            }

            if (current === goalTile) {
                return this.reconstructPath(cameFrom, current)
            }

            openSet.delete(current)

            const neighbors = map.getNeighbors(current)

            for (const neighbor of neighbors) {

                if (!neighbor) continue


                const moveCost = MovementSystem.getTraversalCost(unit, neighbor)

                if (moveCost === Infinity) continue

                const tentativeG = (gScore.get(current) ?? Infinity) + moveCost

                if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {

                    cameFrom.set(neighbor, current)

                    gScore.set(neighbor, tentativeG)

                    fScore.set(
                        neighbor,
                        tentativeG + this.heuristic(neighbor, goalTile)
                    )

                    openSet.add(neighbor)

                }

            }

        }

        return null
    }

    static reconstructPath(cameFrom, current) {

        const path = [current]

        while (cameFrom.has(current)) {
            current = cameFrom.get(current)
            path.unshift(current)
        }

        return path
    }

}