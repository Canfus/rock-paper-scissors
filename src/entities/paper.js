import { Base } from "./base.js";

export class Paper extends Base {
  /**
   * @param {Vector} point
   * @param {Vector} velocity
   * @return {Paper}
   */
  constructor(point, velocity) {
    super("paper", "rock", point, velocity);
  }
}
