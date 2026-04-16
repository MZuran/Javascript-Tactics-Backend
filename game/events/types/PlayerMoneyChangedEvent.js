import GameEvent from "../GameEvent.js"

export default class PlayerMoneyChangedEvent extends GameEvent {

    constructor(playerId, amount, action, source = null) {

        super("playerMoneyChanged")

        this.playerId = playerId
        this.amount = amount
        this.action = action // "gain" | "spend" | "set"
        this.source = source // "city", "unitProduction", etc
    }

}