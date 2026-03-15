export default class GameEventLog {

    static log(gameState, event) {

        event.id = gameState.events.length
        event.turnNumber = gameState.turnNumber

        gameState.events.push(event)

        // We could emit the events here?

    }

}