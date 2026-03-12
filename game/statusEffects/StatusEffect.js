export default class StatusEffect {

    static id = "status"

    static onTurnStart(gameState, unit) {}

    static modifyStat(unit, stat, value) {
        return false
    }

    static canMove(unit) {
        return true
    }

    static canAttack(unit) {
        return true
    }

}