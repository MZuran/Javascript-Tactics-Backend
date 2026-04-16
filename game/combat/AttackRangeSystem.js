import UnitStats from "../stats/UnitStats.js"

export default class AttackRangeSystem {

    static getAttackableTiles(unit, map) {

        const minRange = UnitStats.get(unit, "minRange")
        const maxRange = UnitStats.get(unit, "maxRange")

        const origin = unit.tile

        const attackable = []

        for (let dx = -maxRange; dx <= maxRange; dx++) {

            for (let dy = -maxRange; dy <= maxRange; dy++) {

                const distance = Math.abs(dx) + Math.abs(dy)

                if (distance < minRange || distance > maxRange) continue

                const x = origin.x + dx
                const y = origin.y + dy

                const tile = map.getTile(x, y)

                if (!tile) continue

                attackable.push(tile)
            }
        }

        return attackable
    }

}