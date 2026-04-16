import UnitFactory from "./units/UnitFactory.js"
import PropertyFactory from "./properties/PropertyFactory.js"

import GameMap from "./map/Map.js"
import TerrainTypes from "./map/TerrainTypes.js"

import AStar from "./movement/AStar.js"

import CombatSystem from "./combat/CombatSystem.js"
import MovementSystem from "./movement/MovementSystem.js"
import StatusSystem from "./statusEffects/StatusSystem.js"
import UnitSystem from "./units/UnitSystem.js"
import PropertySystem from "./properties/PropertySystem.js"
import AttackRangeSystem from "./combat/AttackRangeSystem.js"

import GameEventLog from "./events/GameEventLog.js"
import { UnitMovedEvent, TurnChangedEvent, UnitDiedEvent } from "./events/index.js"

import RNG from "./RNG/RNGSystem.js"

export default class GameState {

    constructor(mapData, seed = Date.now()) {

        // unit creation
        this.unitFactory = new UnitFactory()

        // property creation
        this.PropertyFactory = new PropertyFactory()

        // map instance
        this.map = null

        // players in the match
        this.players = []

        // all units currently alive
        // dictionary keyed by unit id
        this.units = new Map()

        // properties like cities/factories
        this.properties = new Map()

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

    // =========================
    // Map & Initialization
    // =========================

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

        // Spawn all properties on map file
        if (data.properties) {
            for (const p of data.properties) {
                this.spawnProperty(p.type, p.owner, p.x, p.y)
            }
        }

    }

    // =========================
    // Getters / Info
    // =========================

    getPlayer(id) {
        return this.players.find(p => p.id === id)
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex]
    }

    getDay() {
        return Math.floor(this.turnNumber / this.players.length) + 1
    }

    getAttackableTiles(unitId) {

        const unit = this.units.get(unitId)

        if (!unit) return []

        //if (unit.owner !== this.getCurrentPlayer().id) return []

        const tiles = AttackRangeSystem.getAttackableTiles(unit, this.map)

        return tiles.map(t => ({
            x: t.x,
            y: t.y
        }))
    }

    getAttackableUnits(unitId) {

        const tiles = this.getAttackableTiles(unitId)

        return tiles
            .map(t => this.map.getTile(t.x, t.y))
            .filter(t => t.unit && t.unit.owner !== this.getCurrentPlayer().id)
            .map(t => t.unit.id)
    }

    canExecuteCommand(command, playerId) {

        // TODO: Add more command validation

        if (command.unitId) {
            const unit = this.units.get(command.unitId)

            if (!unit) return false
            if (unit.owner !== playerId) return false
        }

        return true
    }

    // =========================
    // Core Gameplay Actions
    // =========================

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

        if (targetTile.isOccupied()) {
            throw new Error("Destination tile is occupied")
        }

        const reachableTiles = this.getReachableTiles(unitId)

        if (!reachableTiles.includes(targetTile)) {
            throw new Error("Unreachable tile")
        }

        const startTile = unit.tile

        const path = AStar.findPath(unit, this.map, startTile, targetTile)

        if (!path) {
            throw new Error("No valid path")
        }

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

    buyUnit(type, playerId, x, y) {

        const player = this.getPlayer(playerId)

        if (!player) return false

        // validate tile
        const tile = this.map.getTile(x, y)

        if (!tile) return false
        if (tile.unit) return false

        // optional: validate property ownership (factory, etc)
        if (!tile.property || tile.property.owner !== playerId) {
            return false
        }

        // spend money
        if (!player.spendMoney(this, type.cost, "unitProduction")) {
            return false
        }

        // spawn
        const unit = this.spawnUnit(type, playerId, x, y)

        return unit
    }

    destroyUnit(unit) {

        if (!unit) return

        // remove from tile
        if (unit.tile && unit.tile.unit === unit) {
            unit.tile.unit = null
        }

        // clear reference
        unit.tile = null

        // remove from collection
        this.units.delete(unit.id)
    }

    nextTurn(playerId) {

        let currentPlayer = this.getCurrentPlayer()

        if ( currentPlayer.id != playerId ) {
            throw new Error("Invalid player validation. End turn action cancelled.")
        }

        currentPlayer.onTurnEnd(this)
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

        currentPlayer.onTurnStart(this)
        PropertySystem.onTurnStart(this, currentPlayer.id)
        StatusSystem.onTurnStart(this, currentPlayer.id)
        UnitSystem.onTurnStart(this, currentPlayer.id)

    }

    // =========================
    // Entity Creation / Removal
    // =========================

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

    spawnProperty(type, owner, x, y) {
        const tile = this.map.getTile(x, y)

        if (!tile) throw new Error("Invalid tile")

        if (tile.property) throw new Error("Tile already occupied")

        const property = this.PropertyFactory.create(type, owner)

        property.tile = tile
        tile.property = property

        this.addProperty(property)

        return property
    }

    addUnit(unit) {
        this.units.set(unit.id, unit)
    }

    addProperty(property) {
        this.properties.set(property.id, property)
    }

    // =========================
    // View
    // =========================

    getReachableTiles(unitId) {

        const unit = this.units.get(unitId)

        if (unit.cacheTurn === this.turnNumber) {
            return unit.cachedReachable
        }

        const tiles = MovementSystem.getReachableTiles(unit, this.map)

        unit.cachedReachable = tiles
        unit.cacheTurn = this.turnNumber

        return tiles
    }

    getView(options = {}) {

        // gameState.getView({ playerId: 1, mode: "player" })
        // gameState.getView()
        // gameState.getView({ mode: "full" })

        const { playerId = null, mode = "public" } = options

        const map = []

        for (let y = 0; y < this.map.height; y++) {

            const row = []

            for (let x = 0; x < this.map.width; x++) {

                const tile = this.map.getTile(x, y)

                row.push({
                    x,
                    y,
                    terrain: tile.terrain.name
                })
            }

            map.push(row)
        }

        return {
            map,

            units: Array.from(this.units.values())
                .map(u => u.toView({ playerId, mode }))
                .filter(u => u !== null),

            properties: Array.from(this.properties.values())
                .map(p => p.toView({ playerId, mode })),

            players: this.players.map(p => ({
                ...p.toView({ playerId, mode }),
                isCurrent: p.id === this.getCurrentPlayer().id
            })),

            currentPlayer: this.getCurrentPlayer().id,
            day: this.getDay(),
            turnNumber: this.turnNumber
        }
    }

    // =========================
    // Debug
    // =========================

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