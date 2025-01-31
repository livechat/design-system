export default class VirtualReference {
  element: Element;
  padding: number;

  constructor(element: Element, padding: number) {
    this.element = element;
    this.padding = padding;
  }

  addPadding(rect: DOMRect): Omit<DOMRect, 'toJSON'> {
    const x = Math.ceil(rect.left) - this.padding;
    const y = Math.ceil(rect.top) - this.padding;
    const width = Math.ceil(rect.width) + 2 * this.padding;
    const height = Math.ceil(rect.height) + 2 * this.padding;
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
      right,
    };
  }

  getBoundingClientRect(): Omit<DOMRect, 'toJSON'> {
    return this.addPadding(this.element.getBoundingClientRect());
  }

  get clientWidth(): number {
    return this.getBoundingClientRect().width;
  }

  get clientHeight(): number {
    return this.getBoundingClientRect().height;
  }
}
