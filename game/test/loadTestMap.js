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

match.executeCommand(new MoveUnitCommand(1, 1, 3, 3))
match.executeCommand(new EndTurnCommand(1))
match.executeCommand(new MoveUnitCommand(2, 2, 3, 3))
match.executeCommand(new MoveUnitCommand(2, 2, 2, 4))
match.executeCommand(new EndTurnCommand(2))
match.executeCommand(new MoveUnitCommand(1, 1, 3, 4))

game.printUnits()