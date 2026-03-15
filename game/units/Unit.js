import GameEventLog from "../events/GameEventLog"
import { UnitDamagedEvent, UnitDiedEvent } from "../events"

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

    sufferDamage(gameState, amount, category, aggresorUnit = null) {

        GameEventLog.log(gameState,
            new UnitDamagedEvent(this, category, amount)
        )

        this.hp -= amount

        if (this.hp <= 0) {
            this.destroySelf(gameState, aggresorUnit)
        }

    }

    destroySelf(gameState, killer) {

        GameEventLog.log(gameState,
            new UnitDiedEvent(this)
        )

        const tile = this.tile

        if (tile) {
            tile.unit = null
            this.tile = null
        }

        this.onDeath(gameState, tile, killer)

        gameState.removeUnit(this.id)
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

    onDeath(gameState, tile, killer) {

    }

    onTurnStart(gameState) {

    }

    onTurnEnd(gameState) {

    }

    onAttackStart(enemyUnit, gameState) {

    }

    onAttackEnd(enemyUnit, gameState) {

    }



}