export default class VirtualReference {
  constructor(element, padding) {
    this.element = element;
    this.padding = padding;
  }

  addPadding(rect) {
    const x = Math.round(rect.x) - this.padding;
    const y = Math.round(rect.y) - this.padding;
    const width = Math.round(rect.width) + 2 * this.padding;
    const height = Math.round(rect.height) + 2 * this.padding;
    const top = y;
    const left = x;
    const bottom = top + height;
    const right = left + width;

    return {
      x,
      y,
      width,
      height,
      top,
      left,
      bottom,
      right
    };
  }

  getBoundingClientRect() {
    return this.addPadding(this.element.getBoundingClientRect());
  }

  get clientWidth() {
    return this.getBoundingClientRect().width;
  }

  get clientHeight() {
    return this.getBoundingClientRect().height;
  }
}
