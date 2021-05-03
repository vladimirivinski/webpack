export default class Plane {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(maxSpeed: number = 0) {
    console.log(`${this.name} moved ${maxSpeed}km/h.`);
  }
}
class Boeng extends Plane {
  constructor(name: string) {
    super(name);
  }
  move(maxSpeed = 800) {
    console.log("Flying...");
    super.move(maxSpeed);
  }
}

class AirBus extends Plane {
  constructor(name: string) {
    super(name);
  }
  move(maxSpeed = 915) {
    console.log("Flying...");
    super.move(maxSpeed);
  }
}

let newSuperJet = new Boeng("New Boeng");
let flyingSpoor: Plane = new AirBus("New AirBus");

newSuperJet.move(700);
flyingSpoor.move(780);
