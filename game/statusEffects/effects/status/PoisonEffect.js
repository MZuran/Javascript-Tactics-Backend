import StatusEffect from "../../StatusEffect"

export default class PoisonEffect extends StatusEffect {

    static id = "poisoned"

    static onTurnStart(gameState, unit) {
        unit.hp -= 1
    }

}