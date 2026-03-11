import Unit from "./Unit"

export default class UnitFactory {

    constructor() {
        this.nextUnitId = 1
    }

    createUnit(type, owner) {

        const unit = new Unit( this.nextUnitId, type, owner )

        this.nextUnitId++

        return unit
    }

}