import DamageCalculator from "./DamageCalculator.js"

export default class CombatSystem {

    static attack(gameState, attacker, defender) {

        if (!this.canAttack(gameState, attacker, defender)) {
            return false
        }

        // spend ammo
        if (attacker.type.ammo !== null) {
            attacker.ammo--
        }

        const damage = DamageCalculator.calculate(attacker, defender)

        defender.hp -= damage

        if (defender.hp <= 0) {
            this.destroyUnit(gameState, defender)
        } else {
            this.counterAttack(gameState, attacker, defender)
        }

        attacker.hasAttacked = true

        return true
    }

    static canAttack(gameState, attacker, defender) {

        // attacker and defender must exist
        if (!attacker || !defender) return false

        // defender must actually occupy its tile
        if (!defender.tile) return false
        if (defender.tile.unit !== defender) return false

        // cannot attack twice
        if (attacker.hasAttacked) return false

        // cannot attack own units
        if (attacker.owner === defender.owner) return false

        // attacking tile must exist
        if (!attacker.tile) return false

        // range check
        const dx = Math.abs(attacker.tile.x - defender.tile.x)
        const dy = Math.abs(attacker.tile.y - defender.tile.y)

        const distance = dx + dy

        if (distance < attacker.type.minRange) return false
        if (distance > attacker.type.maxRange) return false

        // ammo check
        if (attacker.type.ammo !== null && attacker.ammo <= 0) {
            return false
        }

        // move + attack restriction
        if (attacker.hasMoved && !attacker.type.canMoveAndAttack) {
            return false
        }

        return true
    }

    static counterAttack(gameState, attacker, defender) {

        if (defender.type.cannotCounterattack) return

        const dx = Math.abs(defender.tile.x - attacker.tile.x)
        const dy = Math.abs(defender.tile.y - attacker.tile.y)

        const distance = dx + dy

        if (distance < defender.type.minRange) return
        if (distance > defender.type.maxRange) return

        const damage = DamageCalculator.calculate(defender, attacker)

        attacker.hp -= damage

        if (attacker.hp <= 0) {
            this.destroyUnit(gameState, attacker)
        }
    }

    static destroyUnit(gameState, unit) {

        if (unit.tile) {
            unit.tile.unit = null
        }

        gameState.removeUnit(unit)
    }
}