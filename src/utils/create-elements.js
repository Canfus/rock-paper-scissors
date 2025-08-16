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

  function findFreePosition(radius, maxAttempts = 50) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x =
        Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius;
      const y =
        Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius;

      let isPositionFree = true;
      for (const existingElement of elements) {
        const dx = x - existingElement.position.x;
        const dy = y - existingElement.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = radius + existingElement.radius + 5;

        if (distance < minDistance) {
          isPositionFree = false;
          break;
        }
      }

      if (isPositionFree) {
        return { x, y };
      }
    }

    return {
      x: Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius,
      y: Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius,
    };
  }

  for (let i = 0; i < MAX_ELEMENTS; i++) {
    const position = findFreePosition(Settings.SIZE);

    const element = new Rock(
      new Vector(position.x, position.y),
      new Vector(SPEED[0], SPEED[1]),
    );
    elements.push(element);
  }

  for (let i = 0; i < MAX_ELEMENTS; i++) {
    const position = findFreePosition(Settings.SIZE);

    const element = new Paper(
      new Vector(position.x, position.y),
      new Vector(SPEED[0], SPEED[1]),
    );
    elements.push(element);
  }

  for (let i = 0; i < MAX_ELEMENTS; i++) {
    const position = findFreePosition(Settings.SIZE);

    const element = new Scissors(
      new Vector(position.x, position.y),
      new Vector(SPEED[0], SPEED[1]),
    );
    elements.push(element);
  }

  return elements;
}
