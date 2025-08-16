import { Paper } from "../entities/paper.js";
import { Scissors } from "../entities/scissors.js";
import { Rock } from "../entities/rock.js";
import { Vector } from "../entities/vector.js";
import { Settings } from "./apply-settings.js";

/**
 * @param {import("./entities/canvas.js").Canvas} canvas
 * @return {import("../entities/base.js").Base[]}
 */
export function createElements(canvas) {
  const { MAX_ELEMENTS, SPEED } = Settings;

  /** @type {import("../entities/base.js").Base[]} */
  const elements = [];

  for (let i = 0; i < MAX_ELEMENTS; i++) {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);

    const xDir = Math.random() > 0.5 ? 1 : -1;
    const yDir = Math.random() > 0.5 ? 1 : -1;

    const element = new Rock(
      new Vector(x, y),
      new Vector(SPEED[0] * xDir, SPEED[1] * yDir),
    );
    elements.push(element);
  }

  for (let i = 0; i < MAX_ELEMENTS; i++) {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);

    const xDir = Math.random() > 0.5 ? 1 : -1;
    const yDir = Math.random() > 0.5 ? 1 : -1;

    const element = new Paper(
      new Vector(x, y),
      new Vector(SPEED[0] * xDir, SPEED[1] * yDir),
    );
    elements.push(element);
  }

  for (let i = 0; i < MAX_ELEMENTS; i++) {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);

    const xDir = Math.random() > 0.5 ? 1 : -1;
    const yDir = Math.random() > 0.5 ? 1 : -1;

    const element = new Scissors(
      new Vector(x, y),
      new Vector(SPEED[0] * xDir, SPEED[1] * yDir),
    );
    elements.push(element);
  }

  return elements;
}
