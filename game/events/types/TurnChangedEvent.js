import GameEvent from "../GameEvent.js"

export default class TurnChangedEvent extends GameEvent {

    constructor(playerId, turnNumber) {

        super("turnChanged")

        this.playerId = playerId
        this.turnNumber = turnNumber

    }

}

/*
GameEventLog.log(gameState,
    new TurnChangedEvent(player.id, gameState.turnNumber)
)
*/