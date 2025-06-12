import { Bubble } from "./bubble";


export class DisplayList {
  list: Bubble[] = [];

  add(bubble: Bubble) {
    this.list = [...this.list, bubble];
  }

  remove(bubble: Bubble) {
    this.list = this.list.filter((d) => d !== bubble);
  }

  clear() {
    this.list = [];
  }

  draw(gc: CanvasRenderingContext2D) {
    this.list.forEach((d) => {
      d.draw(gc);
    });
  }

  start(time: number) {
    this.list.forEach((d) => {
      d.start(time);
    });
  }

  update(time: number, g: number) {
    this.list.forEach((d) => {
      d.update(time, g);
    });
  }
}
