import MatchInitializer from "../match/MatchInitializer.js"

import MoveUnitCommand from "../commands/types/MoveUnitCommand.js"
import EndTurnCommand from "../commands/types/EndTurnCommand.js"
// import AttackUnitCommand when ready
// import EndTurnCommand when ready

const match = MatchInitializer.createMatch("testMap")

const game = match.gameState

//console.log(JSON.stringify(game.getView({ mode: "full" }), null, 2))

// ======================
// TEST MOVE
// ======================

game.printUnits()

match.executeCommand(new MoveUnitCommand(1, 1, 0, 3))
console.log(" ")

game.printUnits()