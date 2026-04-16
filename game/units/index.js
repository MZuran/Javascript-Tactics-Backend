import Infantry from "./types/InfantryUnit.js"
import Tank from "./types/TankUnit.js"
import Helicopter from "./types/HelicopterUnit.js"
import Artillery from "./types/ArtilleryUnit.js"
import AntiAir from "./types/AntiAirUnit.js"

const UnitTypes = {

    infantry: new Infantry(),
    tank: new Tank(),
    helicopter: new Helicopter(),
    artillery: new Artillery(),
    antiAir: new AntiAir()

}

export default UnitTypes