import UnitFactory from "./units/UnitFactory"

import GameMap from "./map/Map"
import TerrainTypes from "./map/TerrainTypes"

import CombatSystem from "./combat/CombatSystem"
import MovementSystem from "./movement/MovementSystem"
import StatusSystem from "./statusEffects/StatusSystem"
import UnitSystem from "./units/UnitSystem"

import GameEventLog from "./events/GameEventLog"
import { UnitMovedEvent, TurnChangedEvent, UnitDiedEvent } from "./events"

import RNG from "./RNG/RNGSystem"

export default class GameState {

    constructor(mapData, seed = Date.now()) {

        // unit creation
        this.unitFactory = new UnitFactory()

        // map instance
        this.map = null

        // players in the match
        this.players = []

        // all units currently alive
        // dictionary keyed by unit id
        this.units = new Map()

        // properties like cities/factories
        this.properties = []

        // whose turn it is
        this.currentPlayerIndex = 0

        // individual player turns
        this.turnNumber = 0

        // event logs of stuff for the frontend
        this.events = []

        // seed and random number generator system
        this.seed = seed
        this.rng = new RNG(seed)

        if (mapData) {
            this.loadMap(mapData)
        }

    }

    loadMap(data) {

        const map = new GameMap(data.width, data.height)

        // Generate a new map and assign its tiles
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {

                const terrainName = data.terrain[y][x]
                const tile = map.getTile(x, y)

                tile.terrain = TerrainTypes[terrainName.toUpperCase()]
            }
        }

        this.map = map

        // Spawn all units on map file
        if (data.units) {
            for (const u of data.units) {
                this.spawnUnit(u.type, u.team, u.x, u.y)
            }
        }

    }

    moveUnit(unitId, x, y) {

        const unit = this.units.get(unitId)

        if (!unit) {
            throw new Error("Unit does not exist")
        }

        if (unit.owner !== this.getCurrentPlayer().id) {
            throw new Error("Not this player's unit")
        }

        if (unit.hasMoved) {
            throw new Error("Unit already moved")
        }

        const targetTile = this.map.getTile(x, y)

        if (!targetTile) {
            throw new Error("Invalid tile")
        }

        const path = MovementSystem.findPath(unit, targetTile, this.map)

        if (!path) {
            throw new Error("No valid path")
        }

        const startTile = unit.tile

        startTile.unit = null

        unit.tile = targetTile
        targetTile.unit = unit

        unit.hasMoved = true

        GameEventLog.log(this,
            new UnitMovedEvent(unit, startTile, targetTile, path)
        )

    }

    attackUnit(attackerId, targetX, targetY) {

        const attacker = this.units.get(attackerId)

        if (!attacker) {
            throw new Error("Unit does not exist")
        }

        if (attacker.owner !== this.getCurrentPlayer().id) {
            throw new Error("Not this player's unit")
        }

        if (attacker.hasAttacked) {
            throw new Error("Unit already attacked")
        }

        if (!attacker.type.canMoveAndAttack && attacker.hasMoved) {
            throw new Error("Unit cannot attack after moving")
        }

        const tile = this.map.getTile(targetX, targetY)

        if (!tile || !tile.unit) {
            throw new Error("No target")
        }

        const defender = tile.unit

        CombatSystem.attack(this, attacker, defender)

        attacker.hasAttacked = true

    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex]
    }

    getDay() {
        return Math.floor(this.turnNumber / this.players.length) + 1
    }

    spawnUnit(type, owner, x, y) {

        const tile = this.map.getTile(x, y)

        if (!tile) throw new Error("Invalid tile")

        if (tile.unit) throw new Error("Tile already occupied")

        const unit = this.unitFactory.createUnit(type, owner)

        unit.tile = tile
        tile.unit = unit

        this.addUnit(unit)

        return unit

    }

    nextTurn() {

        let currentPlayer = this.getCurrentPlayer()

        UnitSystem.onTurnEnd(this, currentPlayer.id)

        this.turnNumber++

        this.currentPlayerIndex++

        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0
        }

        currentPlayer = this.getCurrentPlayer()

        GameEventLog.log(this,
            new TurnChangedEvent(currentPlayer.id, this.turnNumber)
        )

        StatusSystem.onTurnStart(this, currentPlayer.id)
        UnitSystem.onTurnStart(this, currentPlayer.id)

    }

    addUnit(unit) {
        this.units.set(unit.id, unit)
    }

    removeUnit(unitId) {
        this.units.delete(unitId)
    }

    printTerrain() {

        for (let y = 0; y < this.map.height; y++) {

            let row = ""

            for (let x = 0; x < this.map.width; x++) {

                const tile = this.map.getTile(x, y)

                const name = tile.terrain.name
                const code = name.slice(0, 2).toUpperCase()

                row += code + " "

            }

            console.log(row)

        }

    }

    printUnits() {

        for (let y = 0; y < this.map.height; y++) {

            let row = ""

            for (let x = 0; x < this.map.width; x++) {

                const tile = this.map.getTile(x, y)

                if (tile.unit) {

                    const name = tile.unit.type.name
                    const code = name.slice(0, 2).toUpperCase()

                    row += code + " "

                } else {

                    row += ".. "

                }

            }

            console.log(row)

        }

    }

}