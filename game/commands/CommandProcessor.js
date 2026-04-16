export default class CommandProcessor {

    static execute(gameState, command) {

        const playerId = command.playerId

        // validate turn
        if (gameState.getCurrentPlayer().id !== playerId) {
            throw new Error("Not this player's turn")
        }

        // validate command
        if (!gameState.canExecuteCommand(command, playerId)) {
            throw new Error("Invalid command")
        }

        // execute
        command.execute(gameState)

        // the command log is stored in the match
    }
}