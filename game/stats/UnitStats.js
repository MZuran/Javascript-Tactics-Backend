/*

        name
        category
        cost
        maxHP
        movement
        movementType
        fuel
        ammo
        minRange
        maxRange
        attackPower
        canMoveAndAttack
        ignoreAttackingHPFactor
        ignoreDefendingTerrainDefense
        cannotCounterattack
        archetype

*/

export default class UnitStats {

    // Gets the unit's stat value after applying the status effects (if any)
    /**
         * @param {Object} unit
         * @param {"name"|"category"|"cost"|"maxHP"|"movement"|"movementType"|"fuel"|"ammo"|"minRange"|"maxRange"|"attackPower"|"canMoveAndAttack"|"ignoreAttackingHPFactor"|"ignoreDefendingTerrainDefense"|"cannotCounterattack"|"archetype"} stat
     */
    static get(unit, stat) {

        // Here's the original value
        let value = unit.type[stat]

        // For each status effect...
        for (const entry of unit.statusEffects.values()) {

            const effect = entry.effect

            const newValue = effect.modifyStat(unit, stat, value)

            // If the status effect modifies the relevant stat, overwrite stat
            // otherwise don't.

            // This implementation allows multiple stat modifiers in a FIFO stack.
            if (newValue !== false) {
                value = newValue
            }

        }

        return value
    }

}