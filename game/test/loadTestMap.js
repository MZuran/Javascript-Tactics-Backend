import MatchInitializer from "../match/MatchInitializer.js"

import MoveUnitCommand from "../commands/types/MoveUnitCommand.js"
// import AttackUnitCommand when ready
// import EndTurnCommand when ready

const match = MatchInitializer.createMatch("testMap")

const game = match.gameState

console.log("\n=== INITIAL STATE ===")
console.log(JSON.stringify(game.getView({ mode: "full" }), null, 2))

// ======================
// TEST MOVE
// ======================

try {

    match.executeCommand( new MoveUnitCommand(1, 1, 0) )

    console.log("\n=== AFTER MOVE ===")
    game.printUnits()

} catch (e) {
    console.error("Move failed:", e.message)
}