import GameEventLog from "../events/GameEventLog.js"
import { PlayerMoneyChangedEvent } from "../events/index.js"

export default class Player {

    constructor(id, name) {

        this.id = id
        this.name = name

        this.money = 0

        // TODO: Implement card system
        this.deck = []
        this.hand = []
        this.discard = []
    }

    // ======================
    // MONEY API
    // ======================

    addMoney(gameState, amount, source = null) {

        if (amount <= 0) return

        this.money += amount

        GameEventLog.log(
            gameState,
            new PlayerMoneyChangedEvent(
                this.id,
                amount,
                "gain",
                source
            )
        )
    }

    spendMoney(gameState, amount, source = null) {

        if (amount <= 0) return false

        if (this.money < amount) return false

        this.money -= amount

        GameEventLog.log(
            gameState,
            new PlayerMoneyChangedEvent(
                this.id,
                amount,
                "spend",
                source
            )
        )

        return true
    }

    setMoney(gameState, amount) {

        const diff = amount - this.money

        this.money = amount

        GameEventLog.log(
            gameState,
            new PlayerMoneyChangedEvent(
                this.id,
                diff,
                "set"
            )
        )
    }

    canAfford(amount) {
        return this.money >= amount
    }

    // ======================
    // OPTIONAL HOOKS
    // ======================

    onTurnStart(gameState) { }

    onTurnEnd(gameState) { }

    // ======================
    // VIEW
    // ======================

    toView({ playerId = null, mode = "public" } = {}) {

        const base = {
            id: this.id,
            name: this.name,
            money: this.money
        }

        // ======================
        // PUBLIC INFO
        // ======================

        if (mode === "public" || playerId !== this.id) {

            return {
                ...base,

                handSize: this.hand.length,
                deckSize: this.deck.length,
                discardSize: this.discard.length
            }
        }

        // ======================
        // PLAYER PRIVATE INFO
        // ======================

        if (mode === "player" && playerId === this.id) {

            return {
                ...base,

                handSize: this.hand.length,
                deckSize: this.deck.length,
                discardSize: this.discard.length,

                // TODO: include full card data when card system is implemented
                // hand: this.hand,
                // deck: this.deck, // Maybe not this
                // discard: this.discard
            }
        }

        // ======================
        // FULL DEBUG INFO
        // ======================

        if (mode === "full") {

            return {
                ...base,

                hand: this.hand,
                deck: this.deck,
                discard: this.discard
            }
        }

        return base
    }

}