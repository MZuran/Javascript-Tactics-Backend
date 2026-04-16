/* import loadTestMap from "./loadTestMap.js"
import GameState from "../gameState.js"

export default function startTestGame() {

    const gameState = new GameState()

    gameState.players = [
        { id: 1, name: "Player 1" },
        { id: 2, name: "Player 2" }
    ]

    gameState.map = loadTestMap("./game/test/testMap.json", gameState)

    return gameState
} */