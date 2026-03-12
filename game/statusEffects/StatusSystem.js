export default class StatusSystem {

    static onTurnStart(gameState, playerId) {

        for (const unit of gameState.units.values()) {

            if (unit.owner !== playerId) continue

            for (const [id, entry] of unit.statusEffects) {

                entry.effect.onTurnStart?.(gameState, unit)

                entry.remainingTurns--

                if (entry.remainingTurns <= 0) {
                    unit.statusEffects.delete(id)
                }

            }

        }

    }

}