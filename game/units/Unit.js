export default class Unit {

    constructor(id, type, owner) {

        this.id = id
        this.type = type
        this.owner = owner

        this.tile = null

        this.hp = type.maxHP
        this.fuel = type.fuel
        this.ammo = type.ammo

        this.hasMoved = false
        this.hasAttacked = false
    }

}