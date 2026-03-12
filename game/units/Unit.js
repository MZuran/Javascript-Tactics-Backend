export default class Unit {

    constructor(id, type, owner) {

        this.id = id
        this.type = type

        // owner is the playerId
        this.owner = owner

        this.tile = null

        this.hp = type.maxHP
        this.fuel = type.fuel
        this.ammo = type.ammo

        this.hasMoved = false
        this.hasAttacked = false

        // effectId: { effect, remainingTurns }
        this.statusEffects = new Map()
    }

    addStatus(effect, duration) {

        const entry = this.statusEffects.get(effect.id)

        // If the status effect already exists it picks the max value between remaining days or duration
        if (entry) {
            entry.remainingTurns = Math.max(entry.remainingTurns, duration)
        }

        else {
            this.statusEffects.set(effect.id, { effect, remainingTurns: duration })
        }

    }

    removeStatus(id) {
        this.statusEffects.delete(id)
    }

}