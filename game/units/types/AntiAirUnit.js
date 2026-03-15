import BaseUnitType from "../BaseUnitType.js"

export default class AntiAir extends BaseUnitType {

    constructor() {

        super()

        this.name = "antiAir"
        this.category = "vehicle"

        this.cost = 8000

        this.movement = 6
        this.movementType = "tread"

        this.fuel = 60
        this.ammo = 9

        this.attackPower = 10

    }

}