import CityProperty from "./types/CityProperty.js"

const PropertyTypes = {
    city: CityProperty
}

export default class PropertyFactory {

    constructor() {
        this.nextPropertyId = 1
    }

    static create(type, owner) {

        const PropertyClass = PropertyTypes[type]

        this.nextUnitId++

        return new PropertyClass(nextPropertyId - 1, owner)

    }

}