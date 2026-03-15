import BaseUnitType from "../BaseUnitType.js"

export default class Infantry extends BaseUnitType {

    constructor() {

        super()

        this.name = "infantry"
        this.category = "infantry"

        this.cost = 1000
        this.movement = 3
        this.movementType = "infantry"

        this.attackPower = 5
    }

}