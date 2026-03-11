import fs from "fs"

import Map from "../map/Map.js"
import Unit from "../units/Unit.js"
import TerrainTypes from "../map/TerrainTypes.js"
import UnitTypes from "../units/UnitTypes.js"

export default function loadTestMap(path, gameState) {

    const raw = fs.readFileSync(path)
    const data = JSON.parse(raw)

    const map = new Map(data.width, data.height)

    // TERRAIN
    for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {

            const terrainName = data.terrain[y][x]

            const tile = map.getTile(x, y)

            tile.terrain = TerrainTypes[terrainName.toUpperCase()]
        }
    }

    // UNITS
    if (data.units) {

        for (const u of data.units) {

            const tile = map.getTile(u.x, u.y)

            const id = gameState.units.size + 1

            const unit = new Unit(
                id,
                UnitTypes[u.type.toUpperCase()],
                u.team
            )

            unit.tile = tile
            tile.unit = unit

            gameState.addUnit(unit)
        }
    }

    return map
}