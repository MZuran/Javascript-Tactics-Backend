export default class Property {

    static name = "property"
    static category = "neutral"

    constructor(id, owner = null) {

        this.id = id

        this.owner = owner

        this.maxHP = 20
        this.hp = this.maxHP

        this.canBeCaptured = true
        this.canBeAttacked = false

        this.tile = null
    }

    // =========================
    // State
    // =========================

    changeOwnership(newOwner) {
        this.owner = newOwner
    }

    selfDestroy(gameState) {

        if (this.tile) {
            this.tile.property = null
        }

        const index = gameState.properties.indexOf(this)
        if (index !== -1) {
            gameState.properties.splice(index, 1)
        }
    }

    // =========================
    // Hooks
    // =========================

    onCapture(gameState, unit) {

        // default behavior
        if (this.owner !== null) {
            this.changeOwnership(unit.owner)
        }

        this.hp = this.maxHP
    }

    onUnitEntry(gameState, unit) { }

    // TODO: onUnitDeparture

    onDeath(gameState, unit) { }

    onActivation(gameState, data) { }

    onTurnStart(gameState) { }

    onTurnEnd(gameState) { }

    // =========================
    // View
    // =========================

    toView({ playerId = null, mode = "public" } = {}) {

        const base = {
            id: this.id,
            type: this.type,
            owner: this.owner,

            x: this.tile?.x,
            y: this.tile?.y,

            hp: this.hp
        }

        // TODO: fog of war (hide ownership or existence)

        return base
    }
}