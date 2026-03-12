import StatusEffect from "../../StatusEffect"

export default class StunEffect extends StatusEffect {

    static id = "stunned"

    static canMove() {
        return false
    }

    static canAttack() {
        return false
    }

}