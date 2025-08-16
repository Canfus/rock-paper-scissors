import { Base } from "./base.js";

export class Scissors extends Base {
  /**
   * @param {Vector} point
   * @param {Vector} velocity
   * @return {Scissors}
   */
  constructor(point, velocity) {
    super("scissors", "paper", point, velocity);
  }
}
