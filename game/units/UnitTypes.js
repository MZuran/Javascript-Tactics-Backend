// ignoreAttackingHPFactor
// ignoreDefendingTerrainDefense
// cannotCounterattack

const UnitTypes = {

    INFANTRY: {
        name: "infantry",
        category: "infantry",
        cost: 1000,
        maxHP: 10,
        movement: 3,
        movementType: "infantry",
        fuel: 99,
        ammo: null,
        minRange: 1,
        maxRange: 1,
        attackPower: 5,
        canMoveAndAttack: true
    },

    TANK: {
        name: "tank",
        category: "armored",
        cost: 7000,
        maxHP: 10,
        movement: 6,
        movementType: "tread",
        fuel: 70,
        ammo: 9,
        minRange: 1,
        maxRange: 1,
        attackPower: 5,
        canMoveAndAttack: true
    },

    ARTILLERY: {
        name: "artillery",
        category: "vehicle",
        cost: 6000,
        maxHP: 10,
        movement: 5,
        movementType: "tread",
        fuel: 50,
        ammo: 6,
        minRange: 2,
        maxRange: 3,
        attackPower: 5,
        canMoveAndAttack: false
    },

    ANTI_AIR: {
        name: "antiAir",
        category: "vehicle",
        cost: 8000,
        maxHP: 10,
        movement: 6,
        movementType: "tread",
        fuel: 60,
        ammo: 9,
        minRange: 1,
        maxRange: 1,
        attackPower: 10,
        canMoveAndAttack: true
    }

}

export default UnitTypes