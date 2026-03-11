import DamageTable from "./DamageTable.js"

export default class DamageCalculator {

    static calculate(attacker, defender) {

        const attackerCategory = attacker.type.category
        const defenderCategory = defender.type.category

        const attackPower = attacker.type.attackPower

        const table = DamageTable[attackerCategory] || {}

        const multiplier = table[defenderCategory] ?? 1


        // HP factor
        const ignoreAttackingHPFactor =
            attacker.type.ignoreAttackingHPFactor ?? false

        const hpFactor = ignoreAttackingHPFactor
            ? 1
            : attacker.hp / attacker.type.maxHP


        let baseDamage = attackPower * multiplier * hpFactor


        // terrain defense
        const ignoreDefendingTerrainDefense =
            defender.type.ignoreDefendingTerrainDefense ?? false

        const terrainDefense = ignoreDefendingTerrainDefense
            ? 0
            : (defender.tile.terrain.defense ?? 0)


        const damage = Math.max(0, baseDamage - terrainDefense)

        return Math.floor(damage)

    }

}