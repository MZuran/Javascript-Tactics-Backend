import StatusEffect from "../../StatusEffect"

export default class MovementBuffEffect extends StatusEffect {

    static id = "movementBuff"

    static modifyStat(unit, stat, value) {

        if (stat === "movement") {
            return value + 1
        }

        return false
    }

}


