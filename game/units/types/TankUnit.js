import BaseUnitType from "../BaseUnitType.js"

export default class Tank extends BaseUnitType {

    constructor() {

        super()

        this.name = "tank"
        this.category = "armored"

        this.cost = 7000

        this.movement = 6
        this.movementType = "tread"

        this.fuel = 70
        this.ammo = 9

        this.attackPower = 5

    }

}