import Infantry from "./types/Infantry.js"
import Tank from "./types/Tank.js"
import Helicopter from "./types/Helicopter.js"
import Artillery from "./types/Artillery.js"
import AntiAir from "./types/AntiAir.js"

const UnitTypes = {

    infantry: new Infantry(),
    tank: new Tank(),
    helicopter: new Helicopter(),
    artillery: new Artillery(),
    antiAir: new AntiAir()

}

export default UnitTypes