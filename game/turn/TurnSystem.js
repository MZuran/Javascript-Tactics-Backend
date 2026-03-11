export default class TurnSystem {

    static getCurrentPlayer(gameState) {

        return gameState.players[gameState.currentPlayerIndex]

    }

    static startTurn(gameState) {

        const player = this.getCurrentPlayer(gameState)

        for (const unit of gameState.units.values()) {

            if (unit.team === player.id) {

                unit.hasMoved = false
                unit.hasAttacked = false

            }

        }

    }

    static endTurn(gameState) {

        gameState.currentPlayerIndex++

        if (gameState.currentPlayerIndex >= gameState.players.length) {

            gameState.currentPlayerIndex = 0

            gameState.turnNumber++

        }

        this.startTurn(gameState)

    }

}