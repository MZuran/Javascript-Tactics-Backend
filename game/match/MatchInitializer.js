import fs from "fs"

import Map from "../map/Map.js"
import GameState from "../gameState.js"
import Unit from "../units/Unit.js"
import TerrainTypes from "../map/TerrainTypes.js"

export default class MatchInitializer {

    static createMatch(mapName) {

        const raw = fs.readFileSync( `./game/maps/${mapName}.json`, "utf-8" )

        const mapData = JSON.parse(raw)

        const map = new Map(mapData.width, mapData.height)

        // build terrain
        for (let y = 0; y < mapData.height; y++) {

            for (let x = 0; x < mapData.width; x++) {

                const terrainName = mapData.terrain[y][x]

                const tile = map.getTile(x, y)

                tile.terrain = TerrainTypes[terrainName]

            }

        }

        const gameState = new GameState()

        gameState.map = map

        // spawn units
        for (const unitData of mapData.units) {

            const tile = map.getTile(unitData.x, unitData.y)

            const unit = new Unit(
                unitData.type,
                unitData.team,
                tile
            )

            tile.unit = unit

            gameState.units.set(unit.id, unit)

        }

        return gameState

    }

}