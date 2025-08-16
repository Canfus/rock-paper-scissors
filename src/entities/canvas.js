export class Canvas {
  /**
   * @type {HTMLCanvasElement}
   * @private
   */
  _canvas;
  /**
   * @type {CanvasRenderingContext2D}
   * @private
   */
  _context;
  /**
   * @type {number}
   * @private
   */
  _width = window.innerWidth;
  /**
   * @type {number}
   */
  _height = window.innerHeight;

  /**
   * @param {string} id
   * @return {void}
   */
  constructor(id) {
    const canvas = document.createElement("canvas");
    canvas.id = id ?? this._id;

    this._canvas = canvas;
    this._context = canvas.getContext("2d");

    document.body.appendChild(canvas);
  }

  get _id() {
    return Math.random().toString(36).substring(2);
  }

  get canvas() {
    return this._canvas;
  }

  get context() {
    return this._context;
  }

  set backgroundColor(color) {
    this._canvas.style.backgroundColor = color;
  }

  get width() {
    return this._width;
  }
  set width(width) {
    this._canvas.style.width = width;
    this._canvas.width = this._canvas.offsetWidth;
    this._width = this._canvas.offsetWidth;
  }

  get height() {
    return this._height;
  }
  set height(height) {
    this._canvas.style.height = height;
    this._canvas.height = this._canvas.offsetHeight;
    this._height = this._canvas.offsetHeight;
  }
}
