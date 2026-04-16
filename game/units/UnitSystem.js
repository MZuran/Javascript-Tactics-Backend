export default class UnitSystem {

    static onTurnStart(gameState, playerId) {

        for (const unit of gameState.units.values()) {

            if (unit.owner !== playerId) continue

            // reset turn flags
            unit.hasMoved = false
            unit.hasAttacked = false

            unit.onTurnStart(gameState)
        }
    }

    static onTurnEnd(gameState, playerId) {

        for (const unit of gameState.units.values()) {

            if (unit.owner !== playerId) continue

            unit.onTurnEnd(gameState)

        }

    }

}
