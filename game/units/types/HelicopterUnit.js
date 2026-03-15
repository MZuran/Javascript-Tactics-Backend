import BaseUnitType from "../BaseUnitType.js"

export default class Helicopter extends BaseUnitType {

    constructor() {

        super()

        this.name = "helicopter"
        this.category = "flying"

        this.cost = 7000

        this.movement = 6
        this.movementType = "flying"

        this.fuel = 70
        this.ammo = 9

        this.attackPower = 5

    }

}