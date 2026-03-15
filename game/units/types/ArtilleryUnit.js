import BaseUnitType from "../BaseUnitType.js"

export default class Artillery extends BaseUnitType {

    constructor() {

        super()

        this.name = "artillery"
        this.category = "vehicle"

        this.cost = 6000

        this.movement = 5
        this.movementType = "tread"

        this.fuel = 50
        this.ammo = 6

        this.minRange = 2
        this.maxRange = 3

        this.attackPower = 5

        this.canMoveAndAttack = false

    }

}