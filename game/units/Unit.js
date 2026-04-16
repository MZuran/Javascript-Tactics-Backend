import GameEventLog from "../events/GameEventLog"
import { UnitDamagedEvent, UnitDiedEvent } from "../events"
import UnitStats from "../stats/UnitStats"

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

    // =========================
    // Lifecycle
    // =========================

    sufferDamage(gameState, amount, category, aggressorUnit = null) {

        this.hp -= amount

        GameEventLog.log(gameState,
            new UnitDamagedEvent(this, category, amount)
        )

        if (this.hp <= 0) {
            this.destroySelf(gameState, aggressorUnit)
        }
    }

    destroySelf(gameState, killer) {

        const tile = this.tile

        GameEventLog.log(gameState,
            new UnitDiedEvent(this, killer)
        )

        this.onDeath(gameState, tile, killer)

        gameState.destroyUnit(this)
    }

    // =========================
    // Status Effects
    // =========================

    addStatus(effect, duration) {

        const entry = this.statusEffects.get(effect.id)

        // If the status effect already exists it picks the max value between remaining days or duration
        if (entry) {
            entry.remainingTurns = Math.max(entry.remainingTurns, duration)
        } else {
            this.statusEffects.set(effect.id, { effect, remainingTurns: duration })
        }
    }

    removeStatus(id) {
        this.statusEffects.delete(id)
    }

    // =========================
    // Properties
    // =========================

    getCapturePower(property) {
        return UnitStats.get(this, "attackPower")
    }

    getPropertyAttackPower(property) {
        return UnitStats.get(this, "attackPower")
    }

    // =========================
    // Hooks
    // =========================

    onDeath(gameState, tile, killer) { }

    onTurnStart(gameState) { }

    onTurnEnd(gameState) { }

    onAttackStart(enemyUnit, gameState) { }

    onAttackEnd(enemyUnit, gameState) { }

    // =========================
    // View / Serialization
    // =========================

    toView({ playerId = null, mode = "public" } = {}) {

        const base = {
            id: this.id,
            type: this.type.name,
            category: this.type.category,

            owner: this.owner,

            x: this.tile?.x,
            y: this.tile?.y,

            hp: this.hp,
            fuel: this.fuel,
            ammo: this.ammo,

            minRange: this.type.minRange,
            maxRange: this.type.maxRange,

            hasMoved: this.hasMoved,
            hasAttacked: this.hasAttacked
        }

        // ======================
        // STATUS EFFECTS (visible)
        // ======================

        base.statusEffects = Array.from(this.statusEffects.entries()).map(
            ([id, entry]) => ({
                id,
                remainingTurns: entry.remainingTurns
            })
        )

        // ======================
        // TODO: Fog of war
        // ======================

        if (mode === "player" && playerId !== null) {

            // TODO:
            // if unit is not visible to playerId:
            // return null OR minimal info
        }

        // ======================
        // FULL DEBUG
        // ======================

        if (mode === "full") {
            return {
                ...base,

                // debug info
                movement: this.type.movement,
                movementType: this.type.movementType
            }
        }

        return base
    }
}