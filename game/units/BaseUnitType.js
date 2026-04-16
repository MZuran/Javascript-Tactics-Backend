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

        this.attackPower = 1

        this.canMoveAndAttack = true

        // optional flags
        this.ignoreAttackingHPFactor = false
        this.ignoreDefendingTerrainDefense = false
        this.cannotCounterattack = false
        this.archetype = null

    }

}