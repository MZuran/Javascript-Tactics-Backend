export default class UnitSystem {

    static onTurnStart(gameState, playerId) {

        for (const unit of gameState.units.values()) {

            if (unit.owner !== playerId) continue

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
