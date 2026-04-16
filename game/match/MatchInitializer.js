import fs from "fs"

import GameState from "../GameState.js"
import Match from "./Match.js"
import Player from "../player/Player.js"

export default class MatchInitializer {

    static createMatch(mapName) {

        const raw = fs.readFileSync(`./game/maps/${mapName}.json`, "utf-8")
        const mapData = JSON.parse(raw)

        const gameState = new GameState(mapData)

        const playerIds = new Set()

        if (mapData.units) {
            for (const u of mapData.units) {
                playerIds.add(u.team)
            }
        }

        for (const id of playerIds) {

            // TODO: Set custom player names from map file?
            const player = new Player(id, `Player ${id}`)

            // TODO: Set custom starting money from map file?
            player.setMoney(gameState, 10000)

            gameState.players.push(player)
        }

        return new Match(gameState)
    }

}