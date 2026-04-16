export default class GameCommand {

    execute(gameState) {
        throw new Error("execute() not implemented")
    }

    constructor(commandName = "Blank Command") {
        this.name = commandName
    }

}