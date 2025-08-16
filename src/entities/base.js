import { Vector } from "./vector.js";
import { Settings } from "../utils/apply-settings.js";

const type = {
  paper: "📄",
  scissors: "✂️",
  rock: "🪨",
};

export class Base {
  /**
   * @param {'paper' | 'scissors' | 'rock'} value
   * @param {'paper' | 'scissors' | 'rock'} target
   * @param {Vector} point
   * @param {Vector} velocity
   * @return {void}
   */
  constructor(value, target, point, velocity) {
    this.value = value;
    this.label = type[value];
    this.target = target;

    this.position = point || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.radius = Settings.SIZE;
    this.baseSpeed = this.velocity.getMagnitude() || 2;
  }

  /**
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {Base[]} otherObjects
   * @return {void}
   */
  move(canvasWidth, canvasHeight, otherObjects = []) {
    if (this.velocity.getMagnitude() > 0) {
      const normalizedVelocity = this.velocity.normalize();
      normalizedVelocity.multiply(this.baseSpeed);
      this.velocity = normalizedVelocity;
    }

    this.position.add(this.velocity);

    if (this.position.x - this.radius <= 0) {
      this.position.x = this.radius;
      this.velocity.x = Math.abs(this.velocity.x);
    } else if (this.position.x + this.radius >= canvasWidth) {
      this.position.x = canvasWidth - this.radius;
      this.velocity.x = -Math.abs(this.velocity.x);
    }

    if (this.position.y - this.radius <= 0) {
      this.position.y = this.radius;
      this.velocity.y = Math.abs(this.velocity.y);
    } else if (this.position.y + this.radius >= canvasHeight) {
      this.position.y = canvasHeight - this.radius;
      this.velocity.y = -Math.abs(this.velocity.y);
    }

    for (const other of otherObjects) {
      if (other !== this && this._checkCollision(other)) {
        this._handleCollision(other);

        if (other.value === this.target) {
          other.value = this.value;
          other.target = this.target;
          other.label = type[this.value];
        }
      }
    }
  }

  /**
   * @param {Base} other
   * @returns {boolean}
   * @private
   */
  _checkCollision(other) {
    const dx = this.position.x - other.position.x;
    const dy = this.position.y - other.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + other.radius;
  }

  /**
   * @param {Base} other
   * @private
   */
  _handleCollision(other) {
    const collisionVector = new Vector(
      other.position.x - this.position.x,
      other.position.y - this.position.y,
    );
    const distance = collisionVector.getMagnitude();

    if (distance === 0) {
      const angle = Math.random() * Math.PI * 2;
      const separationDistance = (this.radius + other.radius) * 1.1;
      const separationVector = Vector.fromAngle(angle, separationDistance / 2);

      this.position.subtract(separationVector);
      other.position.add(separationVector);
      return;
    }

    const normal = collisionVector.normalize();

    const overlap = this.radius + other.radius - distance;
    const buffer = 2;
    const totalSeparation = overlap + buffer;
    const separationVector = normal.copy();
    separationVector.multiply(totalSeparation / 2);

    this.position.subtract(separationVector);
    other.position.add(separationVector);

    const restitution = 0.8;

    const thisVelDotNormal = this.velocity.dot(normal);
    const reflectedThis = normal.copy();
    reflectedThis.multiply(2 * thisVelDotNormal);
    this.velocity.subtract(reflectedThis);
    this.velocity.multiply(restitution);

    const reverseNormal = normal.copy();
    reverseNormal.multiply(-1);
    const otherVelDotNormal = other.velocity.dot(reverseNormal);
    const reflectedOther = reverseNormal.copy();
    reflectedOther.multiply(2 * otherVelDotNormal);
    other.velocity.subtract(reflectedOther);
    other.velocity.multiply(restitution);

    if (this.velocity.getMagnitude() > 0) {
      this.velocity = this.velocity.normalize();
      this.velocity.multiply(this.baseSpeed);
    }

    if (other.velocity.getMagnitude() > 0) {
      other.velocity = other.velocity.normalize();
      other.velocity.multiply(other.baseSpeed);
    }
  }
}
