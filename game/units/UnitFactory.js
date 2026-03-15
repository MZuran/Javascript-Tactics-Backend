import Unit from "./Unit"
import UnitTypes from "."

export default class UnitFactory {

    constructor() {
        this.nextUnitId = 1
    }

    createUnit(type, owner) {

        if (typeof type === "string") {
            type = UnitTypes[type]
        }

        const unit = new Unit(this.nextUnitId, type, owner)

        this.nextUnitId++

        return unit
    }

    createAndPlace(type, owner, tile) {

        const unit = this.createUnit(type, owner)

        unit.tile = tile
        tile.unit = unit

        return unit
    }

}