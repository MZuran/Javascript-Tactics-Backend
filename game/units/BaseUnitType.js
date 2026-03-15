export default class BaseUnitType {

    constructor() {

        this.name = "unit"
        this.category = "unit"

        this.cost = 0
        this.maxHP = 10

        this.movement = 0
        this.movementType = "foot"

        this.fuel = 0
        this.ammo = null

        this.minRange = 1
        this.maxRange = 1

        this.attackPower = 0

        this.canMoveAndAttack = true

        // optional flags
        this.ignoreAttackingHPFactor = false
        this.ignoreDefendingTerrainDefense = false
        this.cannotCounterattack = false
        this.archetype = null

    }

    addStatus(effect, duration) {

        const entry = this.statusEffects.get(effect.id)

        // If the status effect already exists it picks the max value between remaining days or duration
        if (entry) {
            entry.remainingTurns = Math.max(entry.remainingTurns, duration)
        }

        else {
            this.statusEffects.set(effect.id, { effect, remainingTurns: duration })
        }

    }

    removeStatus(id) {
        this.statusEffects.delete(id)
    }

}