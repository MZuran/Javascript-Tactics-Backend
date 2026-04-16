import fs from "fs"

import GameState from "../GameState.js"
import Match from "./Match.js"
import Player from "../player/Player.js"

export default class MatchInitializer {

    static createMatch(mapName) {

        // TODO: Add a better way to read maps
        const raw = fs.readFileSync(`../../game/maps/${mapName}.json`, "utf-8")
        const mapData = JSON.parse(raw)

        const gameState = new GameState(mapData)

        const playerIds = new Set()

        if (mapData.units) {
            for (const u of mapData.units) {
                playerIds.add(u.team)
            }
        }

        if (mapData.properties) {
            for (const p of mapData.properties) {
                if (p.owner) playerIds.add(p.owner)
            }
        }

        for (const p of mapData.players) {

            const player = new Player(p.id, p.name || `Player ${p.id}`)

            player.setMoney(gameState, p.money ?? 0)

            // TODO: load deck / hand later

            gameState.players.push(player)
        }


        return new Match(gameState)
    }

}