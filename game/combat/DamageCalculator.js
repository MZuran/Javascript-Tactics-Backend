import UnitStats from "../stats/UnitStats.js"
import DamageTable from "./DamageTable.js"

export default class DamageCalculator {

    static calculate(attacker, defender) {

        const attackerCategory = UnitStats.get(attacker, "category")
        const defenderCategory = UnitStats.get(defender, "category")

        const attackPower = UnitStats.get(attacker, "attackPower")

        const table = DamageTable[attackerCategory] || {}

        const multiplier = table[defenderCategory] ?? 1


        // HP factor
        const ignoreAttackingHPFactor =
            UnitStats.get(attacker, "ignoreAttackingHPFactor") ?? false

        const hpFactor = ignoreAttackingHPFactor
            ? 1
            : attacker.hp / attacker.type.maxHP


        let baseDamage = attackPower * multiplier * hpFactor


        // terrain defense
        const ignoreDefendingTerrainDefense =
            UnitStats.get(defender, "ignoreDefendingTerrainDefense") ?? false

        const terrainDefense = ignoreDefendingTerrainDefense
            ? 0
            : (defender.tile.terrain.defense ?? 0)


        const damage = Math.max(0, baseDamage - terrainDefense)

        return Math.floor(damage)

    }

}