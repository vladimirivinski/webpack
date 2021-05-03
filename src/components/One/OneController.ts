export default class Car {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(maxSpeed: number = 0) {
    console.log(`${this.name} moved ${maxSpeed}km/h.`);
  }
}
class BMW extends Car {
  constructor(name: string) {
    super(name);
  }
  move(maxSpeed = 300) {
    console.log("Riding...");
    super.move(maxSpeed);
  }
}

class Audi extends Car {
  constructor(name: string) {
    super(name);
  }
  move(maxSpeed = 285) {
    console.log("Riding...");
    super.move(maxSpeed);
  }
}

let M_Series = new BMW("New M-5");
let RS_Series: Car = new Audi("New RS-6");

M_Series.move(100);
RS_Series.move(105);
