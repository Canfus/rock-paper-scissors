import { Base } from "./base.js";

export class Rock extends Base {
  /**
   * @param {Vector} point
   * @param {Vector} velocity
   * @return {Rock}
   */
  constructor(point, velocity) {
    super("rock", "scissors", point, velocity);
  }
}
