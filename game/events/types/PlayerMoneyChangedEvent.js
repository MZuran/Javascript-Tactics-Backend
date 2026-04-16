export default class PlayerMoneyChangedEvent {

    constructor(playerId, amount, action, source = null) {

        this.type = "playerMoneyChanged"

        this.playerId = playerId
        this.amount = amount
        this.action = action // "gain" | "spend" | "set"
        this.source = source // "city", "unitProduction", etc
    }

}