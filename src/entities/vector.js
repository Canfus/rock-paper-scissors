export class Vector {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /**
   * @param {Vector} vector
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  /**
   * @param {Vector} vector
   */
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  /**
   * @param {number} scalar
   */
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * @param {Vector} vector
   * @returns {number}
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  normalize() {
    const magnitude = this.getMagnitude();
    if (magnitude > 0) {
      this.x /= magnitude;
      this.y /= magnitude;
    }
    return this;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  norm(x, y) {
    return x * x + y * y;
  }

  getMagnitude() {
    return Math.sqrt(this.norm(this.x, this.y));
  }

  /**
   * @param {number} angle
   * @param {number} magnitude
   * @returns {Vector}
   */
  static fromAngle(angle, magnitude) {
    return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }
}
