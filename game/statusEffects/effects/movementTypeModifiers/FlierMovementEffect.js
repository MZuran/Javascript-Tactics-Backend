import StatusEffect from "../../StatusEffect"

export default class FlierMovementEffect extends StatusEffect {

    static id = "flierMovement"

    static modifyStat(unit, stat, value) {

        if ( stat === "movementType" || stat == "category" ) {
            return "flying"
        }

        return false
    }

}