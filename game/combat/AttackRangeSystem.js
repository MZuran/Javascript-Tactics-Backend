export default class AttackRangeSystem {

    static getAttackableTiles(unit, map) {

        const minRange = unit.type.minRange
        const maxRange = unit.type.maxRange

        const origin = unit.tile

        const attackable = []

        for (let x = 0; x < map.width; x++) {

            for (let y = 0; y < map.height; y++) {

                const tile = map.getTile(x, y)

                const dx = Math.abs(tile.x - origin.x)
                const dy = Math.abs(tile.y - origin.y)

                const distance = dx + dy

                if (distance >= minRange && distance <= maxRange) {
                    attackable.push(tile)
                }

            }

        }

        return attackable

    }

}