import { Drawable } from './drawable';

export class DisplayList {
  list: Drawable[] = [];

  add(drawable: Drawable) {
    this.list = [...this.list, drawable];
  }

  remove(drawable: Drawable) {
    this.list = this.list.filter((d) => d !== drawable);
  }

  clear() {
    this.list = [];
  }

  draw(gc: CanvasRenderingContext2D) {
    this.list.forEach((d) => {
      d.draw(gc);
    });
  }
}
