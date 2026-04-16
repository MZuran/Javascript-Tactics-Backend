import Property from "../Property.js"

export default class CityProperty extends Property {

    static name = "city"
    static category = "economic"

    constructor(id, owner = null) {
        super(id, owner)
        
        this.maxHP = 20
        this.hp = this.maxHP

        // cities can be captured and are not destroyed by attacks by default
        this.canBeCaptured = true
        this.canBeAttacked = false
    }

    onTurnStart(gameState) {

        if (!this.owner) return

        const player = gameState.players.find(p => p.id === this.owner)

        player.addMoney(gameState, 1000, "city")

    }

}