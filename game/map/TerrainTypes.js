const TerrainTypes = {

    PLAIN: {
        name: "plain",
        defense: 1,
        movementCost: { infantry: 1, mech: 1, tread: 1, tires: 2 }
    },

    FOREST: {
        name: "forest",
        defense: 2,
        movementCost: { infantry: 1, tread: 2, tires: 3, flying: 1 }
    },

    RIVER: {
        name: "river",
        defense: 0,
        movementCost: { infantry: 2, tread: 2, tires: 3, flying: 1 }
    },

    MOUNTAIN: {
        name: "mountain",
        defense: 4,
        movementCost: { infantry: 2, mech: 1, flying: 1 }
    },

    ROAD: {
        name: "road",
        defense: 0,
        movementCost: { infantry: 1, mech: 1, tread: 1, tires: 1 }
    }

}

export default TerrainTypes