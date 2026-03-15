export default class GameEvent {

    constructor(type) {
        this.type = type
        this.timestamp = Date.now()
    }

}